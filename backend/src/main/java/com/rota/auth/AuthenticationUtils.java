package com.rota.auth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rota.api.StaffService;
import com.rota.database.orm.staff.Role;
import com.rota.database.orm.staff.Staff;
import com.rota.exceptions.AuthenticationHttpException;
import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.Charset;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.JsonParseException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * Utils for handling authorisation tokens and general authentication related methods.
 */
@Service
public class AuthenticationUtils {

  @Value("${auth0.managementapi.client_secret}")
  private String clientSecret;

  @Value("${auth0.managementapi.client_id}")
  private String clientId;

  @Value("${auth0.managementapi.audience}")
  private String audience;

  @Autowired
  StaffService staffService;

  private final ObjectMapper objectMapper = new ObjectMapper();

  private final HttpClient httpClient = HttpClient.newBuilder()
      .version(HttpClient.Version.HTTP_2)
      .build();

  /**
   * TODO decide if it is definitely necessary to check with Auth0. Another method for that perhaps?
   * Checks if the current token is valid locally and via Auth0.
   *
   * @return Whether the current token is valid.
   */
  public boolean validateToken(String token) {
    HttpRequest request = HttpRequest.newBuilder()
        .GET()
        .uri(URI.create("https://rota-flex-101.eu.auth0.com/userinfo"))
        .setHeader("Authorization", "Bearer " + token)
        .build();

    HttpResponse<String> response;
    try {
      response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
    } catch (IOException | InterruptedException e) {
      // This should hopefully never happen
      throw new AuthenticationHttpException(e);
    }
    return SecurityContextHolder.getContext().getAuthentication().isAuthenticated()
        && response.statusCode() == 200;
  }

  /**
   * Finds the user in the database using their email.
   *
   * @param token Valid authentication token.
   * @return {@link Staff} member with that email.
   */
  public Staff getUserFromToken(String token) {
    JsonNode userInfo = getUserJsonFromToken(token);
    return staffService.findStaffByEmail(userInfo.get("email").asText());
  }

  /**
   * TODO Temp solution needs to be changed to be more appropriate when auth is added to backend.
   * Get user role from token.
   *
   * @param token Authentication token
   * @return {@link Role} of the user or <code>null</code> if token is not valid.
   */
  public Optional<Role> getUserRoleFromToken(String token) {
    return validateToken(token)
        ? Optional.of(
        (token.length() % 2 == 0)
            ? Role.MANAGER
            : Role.USER
    )
        : Optional.empty();
  }

  /**
   * Uses the provided access token to get user information from Auth0.
   *
   * @param token Valid authentication token.
   * @return JsonNode of Auth0 information
   */
  public JsonNode getUserJsonFromToken(String token) {
    HttpRequest request = HttpRequest.newBuilder()
        .GET()
        .uri(URI.create("https://rota-flex-101.eu.auth0.com/userinfo"))
        .setHeader("Authorization", "Bearer " + token)
        .build();

    HttpResponse<String> response;
    try {
      response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
    } catch (IOException | InterruptedException e) {
      // This should hopefully never happen
      throw new AuthenticationHttpException(e);
    }
    try {
      return objectMapper.readTree(response.body());
    } catch (JsonProcessingException e) {
      throw new JsonParseException(e);
    }
  }

  /**
   * Get the user email from an access token.
   *
   * @param token the users access_token.
   * @return the users email address.
   */
  public String getUserEmailFromToken(String token) {
    JsonNode userInfo = getUserJsonFromToken(token);
    return userInfo.get("email").asText();
  }

  /**
   * Get the user ID from an access token.
   *
   * @param token the users access_token.
   * @return the users auth0 ID.
   */
  public String getUserIdFromToken(String token) {
    JsonNode userInfo = getUserJsonFromToken(token);
    return userInfo.get("sub").asText();
  }

  /**
   * Return the users roles from the Auth0 Management API.
   *
   * @param token the users access token
   * @return An array of user roles
   */
  public String getUserRolesFromToken(String token) {
    String userId = getUserIdFromToken(token);
    String encodedUserId = URLEncoder
        .encode(userId, Charset.defaultCharset());

    HttpRequest request = HttpRequest.newBuilder()
        .GET()
        .header("Authorization", "Bearer " + getAuth0ManagementToken())
        .uri(URI
            .create("https://rota-flex-101.eu.auth0.com/api/v2/users/" + encodedUserId + "/roles"))
        .build();

    try {
      return httpClient.send(request, HttpResponse.BodyHandlers.ofString()).body();
    } catch (IOException | InterruptedException e) {
      throw new AuthenticationHttpException(e);
    }
  }

  /**
   * Get the Auth0 Management API access token - this is needed to get users information, set and
   * get roles. For this to work, the client_secret must be available.
   *
   * @return Auth0 Management API access token.
   */
  public String getAuth0ManagementToken() {
    String dataBody =
        "grant_type=client_credentials"
            + "&client_id=" + clientId
            + "&client_secret=" + clientSecret
            + "&audience=" + audience;

    HttpRequest request = HttpRequest.newBuilder()
        .POST(HttpRequest.BodyPublishers.ofString(dataBody))
        .uri(URI.create("https://rota-flex-101.eu.auth0.com/oauth/token"))
        .header("content-type", "application/x-www-form-urlencoded")
        .build();

    HttpResponse<String> response;
    try {
      response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
    } catch (IOException | InterruptedException e) {
      // This should never happen
      throw new AuthenticationHttpException(e);
    }

    try {
      return objectMapper.readTree(response.body()).get("access_token").asText();
    } catch (JsonProcessingException e) {
      throw new JsonParseException(e);
    }
  }
}
