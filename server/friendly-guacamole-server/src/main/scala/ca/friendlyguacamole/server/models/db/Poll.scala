package ca.friendlyguacamole.server.models.db

import java.util.Date

/**
  * Created by panagiotis on 11/06/17.
  */
case class Poll(
                 id: Int,
                 title: String,
                 description: Option[String],
                 createdAt: Date,
                 createdBy: Int
               )
