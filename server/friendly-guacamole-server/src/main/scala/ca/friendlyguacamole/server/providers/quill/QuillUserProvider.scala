package ca.friendlyguacamole.server.providers.quill

import java.util.UUID

import ca.friendlyguacamole.server.models.{LoginResponse, UserRequest}
import ca.friendlyguacamole.server.models.db.{GuacSession, GuacUser}
import ca.friendlyguacamole.server.providers.UserProvider
import ca.friendlyguacamole.server.util.Token

import scalaz.concurrent.Task
import delorean._
import pdi.jwt.{Jwt, JwtAlgorithm, JwtClaim}

import scala.concurrent.ExecutionContext.Implicits.global

/**
  * Created by panagiotis on 30/07/17.
  */
object QuillUserProvider extends UserProvider {
  import ca.friendlyguacamole.server.Quill.ctx._

  override def createUser(user: UserRequest): Task[Option[LoginResponse]] = {
    val guacUser = GuacUser(0, user.email, GuacUser.hashPassword(user.password))

    val existingQuote = quote {
      query[GuacUser] filter (_.username == lift(user.email))
    }
    val insertQuote = quote {
      query[GuacUser].insert(lift(guacUser)).returning(_.id)
    }

    val userExistsTask = run(existingQuote).toTask map (_.nonEmpty)
    userExistsTask flatMap { userExists =>
      println(userExists)
      if (!userExists) run(insertQuote).toTask map (id => Some(LoginResponse(Token.toToken(id), "")))
      else Task.delay(None)
    }
  }

  override def login(user: UserRequest): Task[Option[LoginResponse]] = {
    val userQuote = quote {
      query[GuacUser] filter (_.username == lift(user.email))
    }

    val userTask = for {
      users <- run(userQuote).toTask
      myUser = users.headOption
      isValid = myUser.map(_.checkPassword(user.password)).exists(v => v)
    } yield if (isValid) myUser else None

    for {
      userOpt <- userTask
      sessionOpt <- Task.gatherUnordered(userOpt.map(u => createSession(u.id)).toList)
    } yield for {
      user <- userOpt
      session <- sessionOpt.headOption
    } yield LoginResponse(Token.toToken(user.id), session)
  }

  override def refresh(sessionId: String): Task[Option[LoginResponse]] = {
    for {
      userIds <- run(query[GuacSession].filter(_.id == lift(sessionId)).map(_.userId)).toTask
    } yield userIds.headOption.map(uid => LoginResponse(Token.toToken(uid), sessionId))
  }

  override def logout(sessionId: String): Task[Any] = {
    run(query[GuacSession].filter(_.id == lift(sessionId)).delete).toTask
  }

  private def createSession(userId: Int): Task[String] = {
    val sessionId = UUID.randomUUID().toString
    val sessionQuote = quote(query[GuacSession].insert(_.id -> lift(sessionId), _.userId -> lift(userId)))
    run(sessionQuote).toTask map (_ => sessionId)
  }
}
