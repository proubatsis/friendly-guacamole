package ca.friendlyguacamole.server.providers

import ca.friendlyguacamole.server.models.PollModel

import scalaz.concurrent.Task

/**
  * Created by panagiotis on 04/06/17.
  */
trait PollsProvider {
  def getPolls(): Task[Seq[PollModel]]
  def getTrendingTags(): Task[Seq[String]]
  def findPoll(id: Int): Task[Option[PollModel]]
}
