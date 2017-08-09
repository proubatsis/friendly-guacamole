package ca.friendlyguacamole.server.services

import ca.friendlyguacamole.server.providers.PollsProvider
import io.circe.Encoder
import org.http4s._
import org.http4s.dsl._
import org.http4s.circe._
import io.circe.generic.auto._
import ca.friendlyguacamole.server.implicits.AuthorizedRequest._
import ca.friendlyguacamole.server.models.PollRequest
import ca.friendlyguacamole.server.services.middleware.{CommonMiddleware, GuacAuth}
import org.http4s.server.middleware.CORS

/**
  * Created by panagiotis on 04/06/17.
  */
object PollsService {
  implicit def jsonEncoder[A](implicit encoder: Encoder[A]): EntityEncoder[A] = circe.jsonEncoderOf[A]

  private def serviceFetch(pollsProvider: PollsProvider): HttpService = GuacAuth.optional {
    HttpService {
      case req @ GET -> Root =>
        Ok(pollsProvider.getPolls(req.optionalUserId))
      case req @ GET -> Root / IntVar(id) =>
        for {
          somePoll <- pollsProvider.findPoll(id, req.optionalUserId)
          response <- somePoll match {
            case Some(poll) => Ok(poll)
            case None => NotFound("")
          }
        } yield response
      case req @ GET -> Root / "t" / tag =>
        Ok(pollsProvider.findByTag(tag, req.optionalUserId))
      case req @ GET -> Root / "search" / q =>
        Ok(pollsProvider.search(q, req.optionalUserId))
      case GET -> Root / "trending" =>
        Ok(pollsProvider.getTrendingTags())
    }
  }

  private def serviceUpdate(pollsProvider: PollsProvider): HttpService = GuacAuth.required {
    HttpService {
      case req @ POST -> Root / IntVar(pollId) / IntVar(optId) / "vote" =>
        Ok(pollsProvider.vote(req.userId, pollId, optId))
      case req @ POST -> Root =>
        for {
          pollRequest <- req.as(jsonOf[PollRequest])
          poll <- pollsProvider.createPoll(pollRequest, req.userId)
          response <- Ok(poll)
        } yield response
    }
  }

  def service(pollsProvider: PollsProvider): HttpService =
    CommonMiddleware(Service.withFallback(serviceUpdate(pollsProvider))(serviceFetch(pollsProvider)))
}
