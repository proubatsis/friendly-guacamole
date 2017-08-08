package ca.friendlyguacamole.server.providers

import ca.friendlyguacamole.server.models.{LoginResponse, UserRequest}

import scalaz.concurrent.Task

/**
  * Created by panagiotis on 30/07/17.
  */
trait UserProvider {
  def createUser(user: UserRequest): Task[Option[LoginResponse]]
  def login(user: UserRequest): Task[Option[LoginResponse]]
  def refresh(sessionId: String): Task[Option[LoginResponse]]
  def logout(sessionId: String): Task[Any]
}
