package ca.friendlyguacamole.server.models

/**
  * Created by panagiotis on 06/08/17.
  */
case class PollRequest(title: String, description: Option[String], options: Seq[PollOptionRequestField], tags: Seq[String])
case class PollOptionRequestField(name: String)
