package ca.friendlyguacamole.server.models

import ca.friendlyguacamole.server.models.db.{Poll, PollOption}

/**
  * Created by panagiotis on 04/06/17.
  */
case class PollModel(
                    id: Int,
                    title: String,
                    description: Option[String],
                    totalVotes: Int,
                    options: Seq[PollOption]
                    )

object PollModel {
  def apply(poll: Poll, options: Seq[PollOption]): PollModel = PollModel(poll.id, poll.title, poll.description, poll.totalVotes, options)
}
