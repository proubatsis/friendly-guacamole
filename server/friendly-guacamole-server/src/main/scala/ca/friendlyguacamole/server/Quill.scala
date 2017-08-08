package ca.friendlyguacamole.server

import com.typesafe.config.ConfigValueFactory
import io.getquill.util.LoadConfig
import io.getquill.{PostgresAsyncContext, SnakeCase}

/**
  * Created by panagiotis on 30/07/17.
  */
object Quill {
  private val DbNameKey = "database"
  private val DbHostKey = "host"
  private val DbUserKey = "user"
  private val DbPasswordKey = "password"

  private val baseConfig = LoadConfig("ctx")
  private val dbName = sys.env.getOrElse("GUAC_DB_NAME", baseConfig.getString(DbNameKey))
  private val dbHost = sys.env.getOrElse("GUAC_DB_HOST_NAME", baseConfig.getString(DbHostKey))
  private val dbUser = sys.env.getOrElse("GUAC_DB_USER", baseConfig.getString(DbUserKey))
  private val dbPasswordKey = sys.env.getOrElse("GUAC_DB_PASSWORD", baseConfig.getString(DbPasswordKey))

  val ctx: PostgresAsyncContext[SnakeCase] = new PostgresAsyncContext[SnakeCase](
    baseConfig
      .withValue(DbNameKey, ConfigValueFactory.fromAnyRef(dbName))
      .withValue(DbHostKey, ConfigValueFactory.fromAnyRef(dbHost))
      .withValue(DbUserKey, ConfigValueFactory.fromAnyRef(dbUser))
      .withValue(DbPasswordKey, ConfigValueFactory.fromAnyRef(dbPasswordKey))
  )
}
