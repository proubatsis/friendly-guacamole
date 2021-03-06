package ca.friendlyguacamole.server

import java.util.concurrent.{ExecutorService, Executors}

import ca.friendlyguacamole.server.providers.quill.{QuillPostgresPollsProvider, QuillUserProvider}
import ca.friendlyguacamole.server.services.middleware.GuacAuth
import ca.friendlyguacamole.server.services.{PollsService, UserService}

import scala.util.Properties.envOrNone
import scalaz.concurrent.Task
import org.http4s.server.{Server, ServerApp}
import org.http4s.server.blaze.BlazeBuilder


object BlazeExample extends ServerApp {

  val port : Int              = envOrNone("HTTP_PORT") map (_.toInt) getOrElse 8081
  val ip   : String           = "0.0.0.0"
  val pool : ExecutorService  = Executors.newCachedThreadPool()

  override def server(args: List[String]): Task[Server] =
    BlazeBuilder
      .bindHttp(port, ip)
      .mountService(PollsService.service(QuillPostgresPollsProvider), "/api/polls")
      .mountService(UserService.service(QuillUserProvider), "/api/users")
      .withServiceExecutor(pool)
      .start
}
