package ca.friendlyguacamole.server.services

import ca.friendlyguacamole.server.models.UserRequest
import ca.friendlyguacamole.server.providers.UserProvider
import io.circe.Encoder
import org.http4s.circe._
import org.http4s._
import org.http4s.dsl._
import io.circe.generic.auto._

/**
  * Created by panagiotis on 30/07/17.
  */
object UserService {
  implicit def jsonEncoder[A](implicit encoder: Encoder[A]): EntityEncoder[A] = circe.jsonEncoderOf[A]

  def service(userProvider: UserProvider): HttpService = {
    HttpService {
      case req @ POST -> Root / "create" =>
        for {
          userRequest <- req.as(jsonOf[UserRequest])
          resp <- Ok(userProvider.createUser(userRequest))
        } yield resp
      case req @ POST -> Root / "login" =>
        for {
          userRequest <- req.as(jsonOf[UserRequest])
          resp <- Ok(userProvider.login(userRequest))
        } yield resp
    }
  }
}
