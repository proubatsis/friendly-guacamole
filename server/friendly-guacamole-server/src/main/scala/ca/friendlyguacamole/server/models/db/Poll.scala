package ca.friendlyguacamole.server.models.db

/**
  * Created by panagiotis on 11/06/17.
  */
case class Poll(
                 id: Int,
                 title: String,
                 description: Option[String],
                 totalVotes: Int
               )
