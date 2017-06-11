organization := "ca.friendlyguacamole"
name := "friendly-guacamole-server"
version := "0.0.1-SNAPSHOT"
scalaVersion := "2.12.2"

val Http4sVersion = "0.15.11a"

libraryDependencies ++= Seq(
 "org.http4s"     %% "http4s-blaze-server" % Http4sVersion,
 "org.http4s"     %% "http4s-circe"        % Http4sVersion,
 "org.http4s"     %% "http4s-dsl"          % Http4sVersion,
 "ch.qos.logback" %  "logback-classic"     % "1.2.1",
 "io.circe" %% "circe-generic" % "0.6.1",
 "io.circe" %% "circe-literal" % "0.6.1",
 "io.verizon.delorean" %% "core" % "1.2.40-scalaz-7.2",
 "io.getquill" % "quill-async-postgres_2.12" % "1.2.1"
)
