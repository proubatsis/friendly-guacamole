package ca.friendlyguacamole.server.services.middleware

import org.http4s.headers.`Content-Type`
import org.http4s.util.CaseInsensitiveString
import org.http4s._

/**
  * Created by panagiotis on 08/08/17.
  *
  * This middleware is used to strip the "x-user-id" header since this header
  * should only be set by the GuacAuth middleware. If a client sends
  * this header, then it should simply be removed before going on
  * to the service.
  */
object StripUserId {
  def apply(service: HttpService): HttpService = Service.lift { req =>
    service(req.filterHeaders(_.name != CaseInsensitiveString("x-user-id")))
  }
}
