package ca.friendlyguacamole.server.util

import pdi.jwt.{Jwt, JwtAlgorithm, JwtClaim}

import scala.util.Try

/**
  * Created by panagiotis on 01/08/17.
  */
object Token {
  private val TAlgorithm = JwtAlgorithm.HS512
  private val TSecret = "hdeP*H#*RNuekjdsnx"
  private val TExpirySeconds = 60 * 16

  def toToken(userId: Int): String = {
    Jwt.encode(JwtClaim(userId.toString).expiresIn(TExpirySeconds), TSecret, TAlgorithm)
  }

  def fromToken(token: String): Option[Int] = {
    for {
      decoded <- Jwt.decode(token, TSecret, Seq(TAlgorithm)).toOption
      _ = println(decoded)
      userId <- Try(decoded.toInt).toOption
    } yield userId
  }
}
