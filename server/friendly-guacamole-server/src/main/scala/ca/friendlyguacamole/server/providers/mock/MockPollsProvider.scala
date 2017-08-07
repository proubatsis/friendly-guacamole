package ca.friendlyguacamole.server.providers.mock

import ca.friendlyguacamole.server.models.{PollModel, PollOptionModel, PollRequest}
import ca.friendlyguacamole.server.models.db.PollOption
import ca.friendlyguacamole.server.providers.PollsProvider

import scalaz.concurrent.Task

/**
  * Created by panagiotis on 04/06/17.
  */
object MockPollsProvider extends PollsProvider{
  private val polls = List(
    PollModel(1, "Coke vs Pepsi", Some("Just wanna know what ppl prefer"), 10000, List(
      PollOptionModel(1, 1, "Coke", 7500, None),
      PollOptionModel(2, 1, "Pepsi", 2500, None)
    ), Seq()),
    PollModel(2, "What's your major?", None, 5000, List(
      PollOptionModel(3, 2, "Computer Science", 3000, None),
      PollOptionModel(4, 2, "Business", 1500, None),
      PollOptionModel(5, 2, "Engineering", 500, None)
    ), Seq()),
    PollModel(3, "Next place to travel.", Some("First time travelling. Where should I go?"), 800, List(
      PollOptionModel(6, 3, "Canada", 500, None),
      PollOptionModel(7, 3, "United States", 250, None),
      PollOptionModel(8, 3, "Mexico", 50, None)
    ), Seq()),
    PollModel(4, "What should I have for dinner?", None, 200, List(
      PollOptionModel(9, 4, "Pizza", 100, None),
      PollOptionModel(10, 4, "Pasta", 100, None)
    ), Seq())
  )

  override def getPolls(userId: Option[Int]): Task[Seq[PollModel]] = {
    Task.delay(polls)
  }

  override def getTrendingTags(): Task[Seq[String]] = {
    Task.delay {
      List(
        "Toronto",
        "Pineapples",
        "Monkey"
      )
    }
  }

  override def findPoll(id: Int, userId: Option[Int]): Task[Option[PollModel]] = {
    Task.delay(polls find (_.id == id))
  }

  override def createPoll(pollRequest: PollRequest, userId: Int): Task[Option[PollModel]] = {
    Task.delay(polls find (_.title == pollRequest.title))
  }

  override def vote(userId: Int, pollId: Int, optionId: Int): Task[Option[PollModel]] = {
    findPoll(1, None)
  }
}
