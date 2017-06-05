package ca.friendlyguacamole.server.services

import ca.friendlyguacamole.server.providers.PollsProvider
import io.circe.Encoder
import org.http4s._
import org.http4s.dsl._
import io.circe.syntax._
import io.circe.generic.auto._

/**
  * Created by panagiotis on 04/06/17.
  */
object PollsService {
  implicit def jsonEncoder[A](implicit encoder: Encoder[A]): EntityEncoder[A] = circe.jsonEncoderOf[A]

  def service(pollsProvider: PollsProvider): HttpService = {
    HttpService {
      case GET -> Root / "polls" =>
        Ok(pollsProvider.getPolls())
      case GET -> Root / "polls" / "trending" =>
        Ok(pollsProvider.getTrendingTags())
    }
  }
}
