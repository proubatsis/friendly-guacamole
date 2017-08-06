package ca.friendlyguacamole.server.providers

import ca.friendlyguacamole.server.models.PollModel

import scalaz.concurrent.Task

/**
  * Created by panagiotis on 04/06/17.
  */
trait PollsProvider {
  def getPolls(userId: Option[Int]): Task[Seq[PollModel]]
  def getTrendingTags(): Task[Seq[String]]
  def findPoll(id: Int, userId: Option[Int]): Task[Option[PollModel]]
  def vote(userId: Int, pollId: Int, optionId: Int): Task[Option[PollModel]]
}
