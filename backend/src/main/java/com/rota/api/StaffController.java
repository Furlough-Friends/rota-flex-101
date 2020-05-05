package com.rota.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.rota.api.dto.EngagementDto;
import com.rota.api.dto.StaffDto;
import com.rota.auth.Authentication;
import com.rota.database.orm.staff.Role;
import com.rota.database.orm.staff.Staff;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.io.IOException;
import java.time.Instant;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@Api(value = "Manages the responses to staff-related queries")
public class StaffController {

  @Autowired
  StaffService staffService;

  @Autowired
  Authentication authentication;

  static final String AUTHORIZATION_HEADER = "Authorization";

  /**
   * Returns all shifts of a given staff member.
   * Staff ID is inferred from the token passed in the header's Authorization field.
   *
   * @return List of all available shifts.
   * @throws IOException from HttpClient when getting user info.
   * @throws InterruptedException from HttpClient when getting user info.
   */
  @GetMapping("/myShifts")
  @ApiOperation(value = "Returns shifts of an authenticated user.",
      response = EngagementDto[].class)
  public List<EngagementDto> getMyShifts(
      @RequestParam(name = "start", required = false)
      @ApiParam(value = "start time")
          Instant start,

      @RequestParam(name = "end", required = false)
      @ApiParam(value = "end time")
          Instant end
  ) throws IOException, InterruptedException {

    final JsonNode userInfo = authentication.getUserInfoFromToken();
    final Staff staff = authentication.getUserFromJson(userInfo).orElseThrow();

    return staffService.getStaffEngagementsBetween(staff.getId(), start, end);
  }

  /**
   * Checks if the currently authenticated user has manager permissions.
   *
   */
  private void verifyManagementRole() throws IOException, InterruptedException {
    if (authentication.getUserRolesFromToken().contains(Role.MANAGER)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not enough permissions.");
    }
  }

  /**
   * Endpoint to create and enter a new staff record into the system.
   * Staff ID and role is inferred from the token passed in the header's Authorization field.
   *
   * @param staffDto   Staff details.
   * @return A Response entity of a {@link Staff} object.
   * @throws IOException from HttpClient when getting user info.
   * @throws InterruptedException from HttpClient when getting user info.
   */
  @PostMapping("/staff/create")
  @ApiOperation(value = "Lets an authenticated manager create a new staff user",
      consumes = "application/json")
  public ResponseEntity<Staff> createStaff(
      @Valid
      @RequestBody
      @ApiParam("Staff details for the new user")
          StaffDto staffDto
  ) throws IOException, InterruptedException {
    verifyManagementRole();
    // Assuming in general staff entered will be active ones
    Staff createdStaff = staffService.createStaff(staffDto.toStaff());

    return ResponseEntity.ok().body(createdStaff);
  }
}
