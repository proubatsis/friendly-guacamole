package ca.friendlyguacamole.server.util

import pdi.jwt.{Jwt, JwtAlgorithm, JwtCirce, JwtClaim}

import scala.util.Try

/**
  * Created by panagiotis on 01/08/17.
  */
object Token {
  private val TAlgorithm = JwtAlgorithm.HS512
  private val TSecret = "hdeP*H#*RNuekjdsnx"
  private val TExpirySeconds = 60 * 16

  def toToken(userId: Int): String = {
    val jsonString = "{\"userId\":" + userId.toString + "}"
    Jwt.encode(JwtClaim(jsonString).issuedNow.expiresIn(TExpirySeconds), TSecret, TAlgorithm)
  }

  def fromToken(token: String): Option[Int] = {
    val tryToken = for {
      decoded <- JwtCirce.decodeJson(token, TSecret, Seq(TAlgorithm))
      userId <- decoded.hcursor.downField("userId").as[Int].toTry
    } yield userId

    tryToken.toOption
  }
}
