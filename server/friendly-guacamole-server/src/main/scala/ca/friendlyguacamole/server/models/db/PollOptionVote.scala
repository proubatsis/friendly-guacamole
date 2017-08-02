package ca.friendlyguacamole.server.models.db

/**
  * Created by panagiotis on 02/08/17.
  */
case class PollOptionVote(id: Int, guacUserId: Int, pollId: Int, pollOptionId: Int)
