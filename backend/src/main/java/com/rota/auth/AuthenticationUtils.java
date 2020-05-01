package com.rota.auth;

import com.rota.database.orm.staff.Role;
import com.rota.exceptions.AuthenticationHttpException;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Utils for handling authorisation tokens and general authentication related methods.
 */
public class AuthenticationUtils {

  private static final HttpClient HTTP_CLIENT = HttpClient.newBuilder()
      .version(HttpClient.Version.HTTP_2)
      .build();

  /**
   * TODO decide if it is definitely necessary to check with Auth0. Another method for that perhaps?
   * Checks if the current token is valid locally and via Auth0
   *
   * @return Whether the current token is valid.
   */
  public static boolean validateToken(String token) {
    HttpRequest request = HttpRequest.newBuilder()
        .GET()
        .uri(URI.create("https://rota-flex-101.eu.auth0.com/userinfo"))
        .setHeader("Authorization", "Bearer " + token)
        .build();

    HttpResponse<String> response;
    try {
      response = HTTP_CLIENT.send(request, HttpResponse.BodyHandlers.ofString());
    } catch (IOException | InterruptedException e) {
      // This should hopefully never happen
      throw new AuthenticationHttpException(e);
    }
    return SecurityContextHolder.getContext().getAuthentication().isAuthenticated()
        && response.statusCode() == 200;
  }

  /**
   * TODO Need to decide what this method returns... currently the response is JSON with userinfo
   * Uses the provided access token to get user information from Auth0
   *
   * @param token Valid authentication token.
   * @return User information if token is valid and if present.
   */
  public static Optional<Integer> getUserFromToken(String token) {
    HttpRequest request = HttpRequest.newBuilder()
        .GET()
        .uri(URI.create("https://rota-flex-101.eu.auth0.com/userinfo"))
        .setHeader("Authorization", "Bearer " + token)
        .build();

    HttpResponse<String> response;
    try {
      response = HTTP_CLIENT.send(request, HttpResponse.BodyHandlers.ofString());
    } catch (IOException | InterruptedException e) {
      // This should hopefully never happen
      throw new AuthenticationHttpException(e);
    }
    //TODO Use the email address from body to find userID/ user in local database
    response.body();
    return Optional.empty();
  }

  /**
   * TODO Temp solution needs to be changed to be more appropriate when auth is added to backend.
   * Get user role from token.
   *
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
