package ca.friendlyguacamole.server.providers.quill

import java.sql.Timestamp

import ca.friendlyguacamole.server.models.{PollModel, PollOptionModel, PollRequest}
import ca.friendlyguacamole.server.models.db.{Poll, PollOption, PollOptionVote, PollTags}
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
  private val MaxTags = 3
  import Quill.ctx._

  override def getPolls(userId: Option[Int]): Task[Seq[PollModel]] = {
    val q = quote {
      query[Poll].sortBy(_.createdAt)(Ord.desc).map(_.id).take(lift(MaxHomePolls))
    }

    for {
      pollIds <- run(q).toTask
      polls <- fetchPollsWithIds(pollIds, userId)
    } yield polls
  }

  override def findByTag(tag: String, userId: Option[Index]): Task[Seq[PollModel]] = {
    val q = quote {
      query[Poll]
        .sortBy(_.createdAt)
        .join(query[PollTags] filter (_.tag == lift(tag)))
        .on(_.id == _.pollId)
        .map(_._1.id)
        .take(lift(MaxHomePolls))
    }

    for {
      pollIds <- run(q).toTask
      polls <- fetchPollsWithIds(pollIds, userId)
    } yield polls
  }

  override def search(queryString: String, userId: Option[Index]): Task[Seq[PollModel]] = {
    val q = quote {
      query[Poll]
        .filter(_.title.toLowerCase like lift(s"%${queryString.toLowerCase}%"))
        .sortBy(_.createdAt)(Ord.desc)
        .take(lift(MaxHomePolls))
        .map(_.id)
    }

    for {
      pollIds <- run(q).toTask
      polls <- fetchPollsWithIds(pollIds, userId)
    } yield polls
  }

  override def findPoll(id: Int, userId: Option[Int]): Task[Option[PollModel]] = {
    val qPollWithOptions = quote {
      for {
        poll <- query[Poll] filter (_.id == lift(id))
        pollOption <- query[PollOption] if poll.id == pollOption.pollId
      } yield (poll, pollOption)
    }

    val qPollOptionVoteCount = quote {
      query[PollOptionVote] filter (_.pollId == lift(id)) groupBy(_.pollOptionId) map {
        case (optId, votes) => (optId, votes.size)
      }
    }

    val qPollTags = quote {
      query[PollTags] filter (_.pollId == lift(id)) take lift(MaxTags)
    }

    val tPollOptionVoteSelected = userId match {
      case Some(uid) =>
        run(query[PollOptionVote]
          .filter(v => v.pollId == lift(id) && v.guacUserId == lift(uid))
          .map(_.pollOptionId)).toTask
      case None => Task.delay(List())
    }

    for {
      results <- run(qPollWithOptions).toTask
      votes <- run(qPollOptionVoteCount).toTask map (_.toMap mapValues (_.toInt))
      tags <- run(qPollTags).toTask
      selected <- tPollOptionVoteSelected
      resultsUnzipped = results.unzip
    } yield for {
      poll <- resultsUnzipped._1.headOption
      optionModels = resultsUnzipped._2.map(po => PollOptionModel(po, votes.getOrElse(po.id, 0), userId map (_ => selected.contains(po.id))))
    } yield PollModel.fromOptionModels(poll, optionModels, tags)
  }

  override def createPoll(pollRequest: PollRequest, userId: Int): Task[Option[PollModel]] = {
    val options = pollRequest.options.map(o => PollOption(0, 0, o.name))
    val tags = pollRequest.tags.map(t => PollTags(0, 0, t.trim.toLowerCase))

    val qInsertPoll = quote {
      query[Poll]
        .insert(
          _.title -> lift(pollRequest.title),
          _.description -> lift(pollRequest.description),
          _.createdBy -> lift(userId)
        )
        .returning(_.id)
    }
    val qInsertOptions = { pid: Int =>
      val updatedOptions = options.map(o => o.copy(pollId = pid)).toList
      quote(liftQuery(updatedOptions).foreach(o => query[PollOption].insert(o).returning(_.id)))
    }
    val qInsertTags = { pid: Int =>
      val updatedTags = tags.map(_.copy(pollId = pid)).toList
      quote(liftQuery(updatedTags)
        .foreach(t => query[PollTags].insert(t).returning(_.id)))
    }

    for {
      pollId <- run(qInsertPoll).toTask
      optionIds <- run(qInsertOptions(pollId)).toTask
      tagIds <- run(qInsertTags(pollId)).toTask
      poll <- findPoll(pollId, Some(userId))
    } yield poll
  }

  override def getTrendingTags(): Task[Seq[String]] = {
    val q = quote {
      query[PollTags]
        .groupBy(_.tag)
        .map({
          case (tagName, tag) => (tagName, tag.size)
        })
        .sortBy(_._2)(Ord.desc)
        .map(_._1)
        .take(lift(MaxTags))
    }

    run(q).toTask
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
      result <- if (!existing) {
        for {
          _ <- run(query[PollOptionVote].insert(lift(PollOptionVote(0, userId, pollId, optionId))).returning(_.id)).toTask
          poll <- findPoll(pollId, Some(userId))
        } yield poll
      } else {
        Task.delay(None)
      }
    } yield result
  }

  private def fetchPollsWithIds(pollIds: List[Int], userId: Option[Int]): Task[Seq[PollModel]] = {
    for {
      pollOpts <- Task.gatherUnordered(pollIds map (pid => findPoll(pid, userId)))
      polls = pollOpts flatMap (_.toList)
    } yield for {
      id <- pollIds
      poll <- polls if poll.id == id
    } yield poll
  }
}
