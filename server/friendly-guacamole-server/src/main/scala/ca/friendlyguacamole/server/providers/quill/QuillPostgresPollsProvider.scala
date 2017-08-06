package ca.friendlyguacamole.server.providers.quill

import ca.friendlyguacamole.server.models.{PollModel, PollOptionModel}
import ca.friendlyguacamole.server.models.db.{Poll, PollOption, PollOptionVote}
import ca.friendlyguacamole.server.providers.PollsProvider

import scala.concurrent.ExecutionContext.Implicits.global
import scalaz.concurrent.Task
import delorean._
import ca.friendlyguacamole.server.Quill
import io.getquill.{PostgresAsyncContext, SnakeCase}

/**
  * Created by panagiotis on 11/06/17.
  */
object QuillPostgresPollsProvider extends PollsProvider {
  private val MaxHomePolls = 6
  import Quill.ctx._

  override def getPolls(userId: Option[Int]): Task[Seq[PollModel]] = {
    val q = quote {
      query[Poll] map(_.id) take lift(MaxHomePolls)
    }

    for {
      pollIds <- run(q).toTask
      polls <- Task.gatherUnordered(pollIds map (pid => findPoll(pid, userId)))
    } yield polls flatMap (_.toList)
  }

  override def findPoll(id: Int, userId: Option[Int]): Task[Option[PollModel]] = {
    val qPollWithOptions = quote {
      for {
        poll <- query[Poll] filter (_.id == lift(id))
        pollOption <- query[PollOption] if poll.id == pollOption.pollId
      } yield (poll, pollOption)
    }

    val qPollOptionVoteCount = quote {
      query[PollOptionVote].filter(_.pollId == lift(id))
    }

    for {
      results <- run(qPollWithOptions).toTask
      allVotes <- run(qPollOptionVoteCount).toTask
      votesByPollOption = allVotes.groupBy(_.pollOptionId)
      voteCounts = votesByPollOption map (v => (v._1, v._2.size.toInt))
      votes = voteCounts.toMap
      resultsUnzipped = results.unzip
    } yield for {
      poll <- resultsUnzipped._1.headOption
      optionModels = resultsUnzipped._2.map(po => PollOptionModel(po, votes.getOrElse(po.id, 0), None))
    } yield PollModel.fromOptionModels(poll, optionModels)
  }

  override def getTrendingTags(): Task[Seq[String]] = {
    Task.delay {
      List(
        "Potato",
        "Tomato",
        "Robot"
      )
    }
  }

  override def vote(userId: Index, pollId: Index, optionId: Index): Task[Option[PollModel]] = {
    val qExisting = quote {
      for {
        poll <- query[Poll] if poll.id == lift(pollId)
        vote <- query[PollOptionVote] if vote.pollId == poll.id && vote.guacUserId == lift(userId)
      } yield vote
    }

    for {
      existing <- run(qExisting.nonEmpty).toTask
      result <- if (existing) {
        for {
          _ <- run(query[PollOptionVote].insert(lift(PollOptionVote(0, userId, pollId, optionId))).returning(_.id)).toTask
          poll <- findPoll(pollId, Some(userId))
        } yield poll
      } else {
        Task.delay(None)
      }
    } yield result
  }
}
