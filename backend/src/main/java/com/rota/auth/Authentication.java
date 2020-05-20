package com.rota.auth;

import com.rota.api.StaffService;
import com.rota.database.orm.staff.Staff;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

/**
 * Utils for handling authorisation tokens and general authentication related methods.
 */
@Service
public class Authentication {

  @Autowired
  StaffService staffService;

  /**
   * Gets the user email included with Auth0 access token via a custom claim.
   * Throws a SecurityException if no authentication is provided (no auth header).
   * TODO we may want to check if the email is verified in the future
   *
   * @return the users email address.
   */
  public String getEmailFromToken() {
    if (SecurityContextHolder.getContext().getAuthentication() == null) {
      throw new SecurityException("No authorization provided");
    }
    return ((JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication())
        .getTokenAttributes().get("https://rota-flex-101.com/claims/email").toString();
  }

  /**
   * Finds the user in the database using the email provided by access token.
   *
   * @return {@link Staff} optional with that email.
   */
  public Optional<Staff> getUserFromEmail() {
    return staffService.findStaffByEmail(getEmailFromToken());
  }
}
