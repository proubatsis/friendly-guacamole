package ca.friendlyguacamole.server.providers

import ca.friendlyguacamole.server.models.UserRequest

import scalaz.concurrent.Task

/**
  * Created by panagiotis on 30/07/17.
  */
trait UserProvider {
  def createUser(user: UserRequest): Task[Option[String]]
  def login(user: UserRequest): Task[Option[String]]
}
