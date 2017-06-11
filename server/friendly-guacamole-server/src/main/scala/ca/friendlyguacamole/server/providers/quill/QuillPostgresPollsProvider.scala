package ca.friendlyguacamole.server.providers.quill

import ca.friendlyguacamole.server.models.PollModel
import ca.friendlyguacamole.server.models.db.{Poll, PollOption}
import ca.friendlyguacamole.server.providers.PollsProvider
import io.getquill.{PostgresAsyncContext, SnakeCase}

import scala.concurrent.ExecutionContext.Implicits.global
import scalaz.concurrent.Task
import delorean._

/**
  * Created by panagiotis on 11/06/17.
  */
object QuillPostgresPollsProvider extends PollsProvider {
  private val MaxHomePolls = 6
  private lazy val ctx = new PostgresAsyncContext[SnakeCase]("ctx")
  import ctx._

  override def getPolls(): Task[Seq[PollModel]] = {
    val q = quote {
      for {
        poll <- query[Poll] take lift(MaxHomePolls)
        pollOption <- query[PollOption] if poll.id == pollOption.pollId
      } yield (poll, pollOption)
    }

    for {
      result <- ctx.run(q).toTask
      grouped = result groupBy (_._1)
      mapped = grouped mapValues (_ map (_._2))
    } yield mapped.toList map {
      case (poll, options) => PollModel(poll, options)
    }
  }

  override def findPoll(id: Int): Task[Option[PollModel]] = {
    val q = quote {
      for {
        poll <- query[Poll] filter (_.id == lift(id))
        pollOption <- query[PollOption] if poll.id == pollOption.pollId
      } yield (poll, pollOption)
    }

    ctx.run(q).toTask map { result =>
      val resultUnzipped = result.unzip
      for {
        poll <- resultUnzipped._1.headOption
      } yield PollModel(poll, resultUnzipped._2)
    }
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
}
