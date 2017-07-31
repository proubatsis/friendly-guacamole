package ca.friendlyguacamole.server

import io.getquill.{PostgresAsyncContext, SnakeCase}

/**
  * Created by panagiotis on 30/07/17.
  */
object Quill {
  val ctx: PostgresAsyncContext[SnakeCase] = new PostgresAsyncContext[SnakeCase]("ctx")
}
