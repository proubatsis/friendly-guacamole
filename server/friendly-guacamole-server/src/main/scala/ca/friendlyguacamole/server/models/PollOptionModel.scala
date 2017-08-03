package ca.friendlyguacamole.server.models

import ca.friendlyguacamole.server.models.db.PollOption

/**
  * Created by panagiotis on 11/06/17.
  */
case class PollOptionModel(
                       id: Int,
                       pollId: Int,
                       name: String,
                       count: Int,
                       selected: Option[Boolean]
                     )

object PollOptionModel {
  def apply(pollOption: PollOption, count: Int, selected: Option[Boolean]): PollOptionModel =
    PollOptionModel(pollOption.id, pollOption.pollId, pollOption.name, count, selected)
}
