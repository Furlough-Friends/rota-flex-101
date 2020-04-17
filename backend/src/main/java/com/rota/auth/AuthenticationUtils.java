package com.rota.auth;

import java.util.Optional;

/**
 * Dummy class which represents user authentication.
 */
public class AuthenticationUtils {
  /**
   * Checks if the provided token is valid.
   * @param token Authentication token.
   * @return Whether authentication was successful.
   */
  public static boolean validateToken(String token) {
    return true;
  }

  /**
   * Extracts user information from the provided token.
   * @param token Authentication token.
   * @return User information if token is valid and if present.
   */
  public static Optional<String> getUserFromToken(String token) {
    return validateToken(token)
        ? Optional.of(token)
        : Optional.empty();
  }
}
