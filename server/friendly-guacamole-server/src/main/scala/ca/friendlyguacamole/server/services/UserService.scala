package ca.friendlyguacamole.server.services

import ca.friendlyguacamole.server.models.{LoginResponse, UserRequest}
import ca.friendlyguacamole.server.providers.UserProvider
import io.circe.Encoder
import org.http4s.circe._
import org.http4s._
import org.http4s.dsl.{TemporaryRedirect, _}
import io.circe.generic.auto._
import org.http4s.server.middleware.CORS

/**
  * Created by panagiotis on 30/07/17.
  */
object UserService {
  implicit def jsonEncoder[A](implicit encoder: Encoder[A]): EntityEncoder[A] = circe.jsonEncoderOf[A]
  private val SessionCookie = "my-guac-session"
  private val LogoutRedirect = Uri.unsafeFromString("/")

  def service(userProvider: UserProvider): HttpService = CORS {
    HttpService {
      case req @ POST -> Root / "create" =>
        for {
          userRequest <- req.as(jsonOf[UserRequest])
          login <- userProvider.createUser(userRequest)
          resp <- Ok(login)
        } yield loginResponseWithCookie(login, resp)
      case req @ POST -> Root / "login" =>
        for {
          userRequest <- req.as(jsonOf[UserRequest])
          login <- userProvider.login(userRequest)
          resp <- Ok(login)
        } yield loginResponseWithCookie(login, resp)
      case req @ POST -> Root / "refresh" =>
        getSessionCookie(req) match {
          case Some(sCookie) => Ok(userProvider.refresh(sCookie.content))
          case None => Forbidden()
        }
      case req @ GET -> Root / "logout" =>
        getSessionCookie(req) match {
          case Some(sCookie) => for {
            _ <- userProvider.logout(sCookie.content)
            resp <- TemporaryRedirect(LogoutRedirect).removeCookie(SessionCookie)
          } yield resp
          case None => TemporaryRedirect(LogoutRedirect)
        }
    }
  }

  private def loginResponseWithCookie(login: Option[LoginResponse], resp: Response) = login match {
    case Some(l) => resp.addCookie(SessionCookie, l.session)
    case None => resp
  }

  private def getSessionCookie(request: Request) =
    headers.Cookie.from(request.headers).toList.flatMap(_.values.list).find(_.name == SessionCookie)
}
