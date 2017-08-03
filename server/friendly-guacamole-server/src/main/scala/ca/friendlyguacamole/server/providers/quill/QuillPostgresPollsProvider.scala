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
      for {
        poll <- query[Poll] take lift(MaxHomePolls)
        pollOption <- query[PollOption] if poll.id == pollOption.pollId
      } yield (poll, pollOption)
    }

    for {
      result <- run(q).toTask
      grouped = result groupBy (_._1)
      mapped = grouped mapValues (_ map (_._2))
    } yield mapped.toList map {
      case (poll, options) => PollModel.fromOptions(poll, options)
    }
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

  override def vote(userId: Index, pollId: Index, optionId: Index): Task[Index] = {
    Task.delay(7)
  }
}
