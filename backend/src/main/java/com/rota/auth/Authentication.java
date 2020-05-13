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

  @Autowired
  StaffService staffService;

  private final ObjectMapper objectMapper = new ObjectMapper();

  private final HttpClient httpClient = HttpClient.newBuilder()
      .version(HttpClient.Version.HTTP_2)
      .build();

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
