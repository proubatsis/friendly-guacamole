package ca.friendlyguacamole.server.models.db

import java.util.Date

/**
  * Created by panagiotis on 07/08/17.
  */
case class GuacSession(id: String, userId: Int, created: Date)
