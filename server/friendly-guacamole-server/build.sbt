organization := "ca.friendlyguacamole"
name := "friendly-guacamole-server"
version := "1.0.0"
scalaVersion := "2.12.2"

val Http4sVersion = "0.15.11a"

libraryDependencies ++= Seq(
  "org.http4s"     %% "http4s-blaze-server" % Http4sVersion,
  "org.http4s"     %% "http4s-circe"        % Http4sVersion,
  "org.http4s"     %% "http4s-dsl"          % Http4sVersion,
  "ch.qos.logback" %  "logback-classic"     % "1.2.1",
  "io.circe" %% "circe-generic" % "0.8.0",
  "io.circe" %% "circe-literal" % "0.8.0",
  "io.verizon.delorean" %% "core" % "1.2.40-scalaz-7.2",
  "io.getquill" % "quill-async-postgres_2.12" % "1.2.1",
  "com.pauldijou" %% "jwt-circe" % "0.14.0",
  "com.github.t3hnar" %% "scala-bcrypt" % "3.0"
)

enablePlugins(JavaServerAppPackaging)
enablePlugins(DockerPlugin)
enablePlugins(UniversalPlugin)

dockerBaseImage := "openjdk:8-jre"
dockerExposedPorts := Seq(8081)

packageName in Docker := packageName.value
