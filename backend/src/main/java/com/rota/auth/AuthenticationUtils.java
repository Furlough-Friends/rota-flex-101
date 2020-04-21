package com.rota.auth;

import com.rota.database.orm.staff.Role;
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

  /**
   * TODO Temp solution needs to be changed to be more appropriate when auth is added to backend.
   * Get user role from token.
   * @param token Authentication token
   * @return {@link Role} of the user or <code>null</code> if token is not valid.
   */
  public static Optional<Role> getUserRoleFromToken(String token) {
    return validateToken(token)
        ? Optional.of(
          (token.length() % 2 == 0)
            ? Role.MANAGER
            : Role.USER
          )
        : Optional.empty();
  }
}
