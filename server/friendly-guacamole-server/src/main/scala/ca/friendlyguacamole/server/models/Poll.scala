package ca.friendlyguacamole.server.models

/**
  * Created by panagiotis on 04/06/17.
  */
case class Poll(
               id: Int,
               title: String,
               description: Option[String],
               totalVotes: Int
               )

case class PollOption(
                     id: Int,
                     pollId: Int,
                     name: String,
                     count: Int,
                     selected: Option[Boolean]
                     )

case class PollModel(
                    id: Int,
                    title: String,
                    description: Option[String],
                    totalVotes: Int,
                    options: Seq[PollOption]
                    )

object Poll {
  def createModel(poll: Poll, options: Seq[PollOption]): PollModel =
    PollModel(poll.id, poll.title, poll.description, poll.totalVotes, options)
}
