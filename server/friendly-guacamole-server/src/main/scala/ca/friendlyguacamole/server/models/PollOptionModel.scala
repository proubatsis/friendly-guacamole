package ca.friendlyguacamole.server.models

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
