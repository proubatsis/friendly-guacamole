package ca.friendlyguacamole.server.implicits

import ca.friendlyguacamole.server.util.GuacHeaders
import org.http4s.Request
import org.http4s.util.CaseInsensitiveString

import scala.util.Try

/**
  * Created by panagiotis on 01/08/17.
  */
object AuthorizedRequest {
  implicit class GuacAuthRequest(request: Request) {
    def userId: Int =
      request.headers.get(CaseInsensitiveString(GuacHeaders.UserId)).map(_.value.toInt).head

    def optionalUserId: Option[Int] =
      request.headers.get(CaseInsensitiveString(GuacHeaders.UserId)).flatMap(o => Try(o.value.toInt).toOption)
  }
}
