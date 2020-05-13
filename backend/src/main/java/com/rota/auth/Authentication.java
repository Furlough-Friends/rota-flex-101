package com.rota.auth;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rota.api.StaffService;
import com.rota.database.orm.staff.Role;
import com.rota.database.orm.staff.Staff;
import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

/**
 * Utils for handling authorisation tokens and general authentication related methods.
 */
@Service
public class Authentication {

  @Value("${auth0.baseurl}")
  private String baseUrl;

  @Value("${AUTH_CLIENT_SECRET}")
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
   * @throws IOException          from HttpClient send.
   * @throws InterruptedException from HttpClient send.
   */
  public boolean validateToken() throws IOException, InterruptedException {
    HttpRequest request = HttpRequest.newBuilder()
        .GET()
        .uri(URI.create(baseUrl + "userinfo"))
        .setHeader("Authorization", "Bearer " + getTokenValue())
        .build();

    HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
    return SecurityContextHolder.getContext().getAuthentication().isAuthenticated()
        && response.statusCode() == 200;
  }

  /**
   * Uses the provided access token to get user information from Auth0.
   *
   * @return JsonNode of Auth0 information
   * @throws IOException          from HttpClient when getting user info.
   * @throws InterruptedException from HttpClient when getting user info.
   */
  public JsonNode getUserInfoFromToken() throws IOException, InterruptedException {
    HttpRequest request = HttpRequest.newBuilder()
        .GET()
        .uri(URI.create(baseUrl + "userinfo"))
        .setHeader("Authorization", "Bearer " + getTokenValue())
        .build();

    HttpResponse<String> response = sendRequest(request);

    return objectMapper.readTree(response.body());
  }

  /**
   * Get the Auth0 Management API access token - this is needed to get users information, set and
   * get roles. For this to work, the client_secret must be available.
   *
   * @return Auth0 Management API access token.
   * @throws IOException          from HttpClient send.
   * @throws InterruptedException from HttpClient send.
   */
  private String getAuth0ManagementToken() throws IOException, InterruptedException {
    String dataBody =
        "grant_type=client_credentials"
            + "&client_id=" + clientId
            + "&client_secret=" + clientSecret
            + "&audience=" + audience;

    HttpRequest request = HttpRequest.newBuilder()
        .POST(HttpRequest.BodyPublishers.ofString(dataBody))
        .uri(URI.create(baseUrl + "oauth/token"))
        .header("content-type", "application/x-www-form-urlencoded")
        .build();

    HttpResponse<String> response = sendRequest(request);

    return objectMapper.readTree(response.body()).get("access_token").asText();
  }

  /**
   * Return the users roles from the Auth0 Management API.
   *
   * @return A list of user roles
   * @throws IOException          from HttpClient when getting user roles.
   * @throws InterruptedException from HttpClient when getting user roles.
   */
  public List<Role> getUserRolesFromToken() throws IOException, InterruptedException {
    String userId = getUserIdFromToken();
    String encodedUserId = URLEncoder
        .encode(userId, Charset.defaultCharset());

    HttpRequest request = HttpRequest.newBuilder()
        .GET()
        .header("Authorization", "Bearer " + getAuth0ManagementToken())
        .uri(URI
            .create(baseUrl + "api/v2/users/" + encodedUserId + "/roles"))
        .build();

    HttpResponse<String> response = sendRequest(request);

    List<Role> roles = new ArrayList<>();

    JsonNode responseBody = objectMapper.readTree(response.body());
    responseBody.elements().forEachRemaining(
        roleName -> roles.add(Role.valueOf(roleName.get("name").asText().toUpperCase())));
    return roles;
  }

  /**
   * Finds the user in the database using their email. The email is obtained via
   * userInfo Json.
   *
   * @param userInfo Valid authentication token.
   * @return {@link Staff} optional with that email.
   */
  public Optional<Staff> getUserFromJson(JsonNode userInfo) {
    return staffService.findStaffByEmail(getUserEmailFromJson(userInfo));
  }

  /**
   * Get the user email from Auth0 userInfo Json.
   *
   * @param userInfo the userInfo provided by Auth0.
   * @return the users email address.
   */
  public String getUserEmailFromJson(JsonNode userInfo) {
    return userInfo.get("email").asText();
  }

  /**
   * Get Auth0 user ID from the access token.
   *
   * @return the users auth0 ID.
   */
  public String getUserIdFromToken() {
    return SecurityContextHolder.getContext().getAuthentication().getName();
  }

  /**
   * Gets the string value of the current authenticated token.
   *
   * @return the token as a string.
   */
  private String getTokenValue() {
    return ((JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication())
        .getToken().getTokenValue();
  }

  /**
   * Sends a HttpRequest.
   *
   * @param request the request
   * @return the HttpResponse object
   * @throws IOException          from HttpClient send.
   * @throws InterruptedException from HttpClient send.
   */
  private HttpResponse<String> sendRequest(HttpRequest request)
      throws IOException, InterruptedException {
    return httpClient.send(request, HttpResponse.BodyHandlers.ofString());
  }
}
