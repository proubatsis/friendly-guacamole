package ca.friendlyguacamole.server.services.middleware

import ca.friendlyguacamole.server.models.db.GuacUser
import ca.friendlyguacamole.server.util.{GuacHeaders, Token}
import org.http4s._
import org.http4s.dsl._
import org.http4s.util.CaseInsensitiveString

import scalaz.Kleisli
import scalaz.concurrent.Task

/**
  * Created by panagiotis on 31/07/17.
  */
object GuacAuth {
  def optional(service: HttpService): HttpService = Service.lift { req =>
    userIdFromRequest(req) match {
      case Some(id) =>
        req.putHeaders(Header(GuacHeaders.UserId, id.toString))
        service(req)
      case None => service(req)
    }
  }

  def required(service: HttpService): HttpService = Service.lift { req =>
    userIdFromRequest(req) match {
      case Some(id) =>
        req.putHeaders(Header(GuacHeaders.UserId, id.toString))
        service(req)
      case None => Forbidden()
    }
  }

  private def getTokenFromBearer(bearer: List[String]) = {
    bearer match {
      case _ :: b :: _ => Some(b)
      case _ => None
    }
  }

  private def userIdFromRequest(req: Request) = {
    for {
      authHeader <- req.headers.get(CaseInsensitiveString("Authorization"))
      bearer = authHeader.value.split(" ").toList
      token <- getTokenFromBearer(bearer)
      userId <- Token.fromToken(token)
    } yield userId
  }
}
