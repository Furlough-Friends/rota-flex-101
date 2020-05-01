package com.rota.api;

import com.rota.api.dto.EngagementDto;
import com.rota.api.dto.StaffDto;
import com.rota.auth.AuthenticationUtils;
import com.rota.database.orm.staff.Role;
import com.rota.database.orm.staff.Staff;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.time.Instant;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@Api(value = "Manages the responses to staff-related queries")
public class StaffController {

  @Autowired
  StaffService staffService;

  @Autowired
  AuthenticationUtils authenticationUtils;

  static final String AUTHORIZATION_HEADER = "Authorization";

  /**
   * Returns all shifts of a given staff member.
   * Staff ID is inferred from the token passed in the header's Authorization field.
   *
   * @param authString Authentication token.
   * @return List of all available shifts.
   */
  @GetMapping("/myShifts")
  @ApiOperation(value = "Returns shifts of an authenticated user. User is inferred from the "
      + "authentication token passed in a header", response = EngagementDto[].class)
  public List<EngagementDto> getMyShifts(
      @RequestHeader(AUTHORIZATION_HEADER)
      @ApiParam(value = "Authentication token", required = true)
          String authString,

      @RequestParam(name = "start", required = false)
      @ApiParam(value = "start time")
          Instant start,

      @RequestParam(name = "end", required = false)
      @ApiParam(value = "end time")
          Instant end
  ) {
    if (!authenticationUtils.validateToken(authString)) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Failed to authorize.");
    }

    final int user =
        authenticationUtils.getUserFromToken(authString).getId();

    return staffService.getStaffEngagementsBetween(user, start, end);
  }

  private void verifyManagementRole(String authString) {
    final Role role = authenticationUtils
        .getUserRoleFromToken(authString)
        .orElseThrow(() ->
            new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Failed to authorize.")
        );

    if (role != Role.MANAGER) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not enough permissions.");
    }
  }

  /**
   * Endpoint to create and enter a new staff record into the system.
   * Staff ID and role is inferred from the token passed in the header's Authorization field.
   *
   * @param authString Authentication token.
   * @param staffDto   Staff details.
   * @return A Response entity of a {@link Staff} object
   */
  @PostMapping("/staff/create")
  @ApiOperation(value = "Lets an authenticated manager create a new staff user",
      consumes = "application/json")
  public ResponseEntity<Staff> createStaff(
      @RequestHeader(AUTHORIZATION_HEADER)
      @ApiParam(value = "Authentication token")
          String authString,

      @Valid
      @RequestBody
      @ApiParam("Staff details for the new user")
          StaffDto staffDto
  ) {
    verifyManagementRole(authString);
    // Assuming in general staff entered will be active ones
    Staff createdStaff = staffService.createStaff(staffDto.toStaff());

    return ResponseEntity.ok().body(createdStaff);
  }
}
