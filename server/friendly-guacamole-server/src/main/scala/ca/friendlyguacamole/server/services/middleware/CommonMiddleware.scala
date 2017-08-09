package ca.friendlyguacamole.server.services.middleware

import org.http4s.HttpService
import org.http4s.server.middleware.CORS

/**
  * Created by panagiotis on 08/08/17.
  */
object CommonMiddleware {
  def apply(service: HttpService): HttpService = {
    StripUserId(CORS(service))
  }
}
