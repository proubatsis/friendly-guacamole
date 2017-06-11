package ca.friendlyguacamole.server.models.db

/**
  * Created by panagiotis on 11/06/17.
  */
case class PollOption(
                       id: Int,
                       pollId: Int,
                       name: String
                     )
