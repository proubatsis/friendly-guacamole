package ca.friendlyguacamole.server.models

import ca.friendlyguacamole.server.models.db.{Poll, PollOption, PollTags}

/**
  * Created by panagiotis on 04/06/17.
  */
case class PollModel(
                    id: Int,
                    title: String,
                    description: Option[String],
                    totalVotes: Int,
                    options: Seq[PollOptionModel],
                    tags: Seq[String]
                    )

object PollModel {
  def fromOptionModels(poll: Poll, options: Seq[PollOptionModel], tags: Seq[PollTags]): PollModel =
    PollModel(poll.id, poll.title, poll.description, options.map(_.count).sum, options, tags map (_.tag))

  def fromOptions(poll: Poll, options: Seq[PollOption], tags: Seq[PollTags]): PollModel =
    fromOptionModels(poll, options map (o => PollOptionModel(o.id, o.pollId, o.name, 0, None)), tags)
}
