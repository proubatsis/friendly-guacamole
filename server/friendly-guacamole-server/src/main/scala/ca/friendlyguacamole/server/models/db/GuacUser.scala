package ca.friendlyguacamole.server.models.db

import com.github.t3hnar.bcrypt._

/**
  * Created by panagiotis on 30/07/17.
  */
case class GuacUser(id: Int, username: String, password: String) {
  def checkPassword(givenPassword: String): Boolean = {
    givenPassword.isBcrypted(password)
  }
}

object GuacUser {
  def hashPassword(password: String): String = {
    password.bcrypt
  }
}
