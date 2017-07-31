package ca.friendlyguacamole.server.providers.quill

import ca.friendlyguacamole.server.models.UserRequest
import ca.friendlyguacamole.server.models.db.GuacUser
import ca.friendlyguacamole.server.providers.UserProvider

import scalaz.concurrent.Task
import delorean._
import pdi.jwt.{Jwt, JwtAlgorithm, JwtClaim}
import scala.concurrent.ExecutionContext.Implicits.global

/**
  * Created by panagiotis on 30/07/17.
  */
object QuillUserProvider extends UserProvider {
  import ca.friendlyguacamole.server.Quill.ctx._

  private val TAlgorithm = JwtAlgorithm.HS512
  private val TSecret = "hdeP*H#*RNuekjdsnx"
  private val TExpirySeconds = 60 * 16

  private def toToken(userId: Int) = {
    Jwt.encode(JwtClaim(userId.toString).expiresIn(TExpirySeconds), TSecret, TAlgorithm)
  }

  override def createUser(user: UserRequest): Task[Option[String]] = {
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
      if (!userExists) run(insertQuote).toTask map (id => Some(toToken(id)))
      else Task.delay(None)
    }
  }

  override def login(user: UserRequest): Task[Option[String]] = {
    val userQuote = quote {
      query[GuacUser] filter (_.username == lift(user.email))
    }

    for {
      users <- run(userQuote).toTask
      myUser = users.headOption
      isValid = myUser.map(_.checkPassword(user.password)).exists(v => v)
    } yield if (isValid) myUser.map(u => toToken(u.id)) else None
  }
}
