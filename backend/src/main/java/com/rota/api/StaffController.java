package com.rota.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.rota.api.dto.EngagementDto;
import com.rota.api.dto.StaffDto;
import com.rota.auth.Authentication;
import com.rota.database.orm.staff.Staff;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.io.IOException;
import java.time.Instant;
import java.util.List;
import javax.validation.Valid;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

  static final String STAFF_NOT_FOUND_MESSAGE =
      "No member of staff exists for your credentials. Please log in again";

  @GetMapping("/test")
  public String test() {
    return authentication.getEmailFromToken();
  }

  /**
   * Returns all shifts of a given staff member.
   * Staff ID is inferred from the token passed in the header's Authorization field.
   *
   * @return List of all available shifts.
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
  ) {

    final Staff staff = authentication.getUserFromJson().orElseThrow(
        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, STAFF_NOT_FOUND_MESSAGE));

    return staffService.getStaffEngagementsBetween(staff.getId(), start, end);
  }

  /**
   * Endpoint to create and enter a new staff record into the system.
   * Staff ID and role is inferred from the token passed in the header's Authorization field.
   *
   * @param staffDto Staff details.
   * @return A Response entity of a {@link Staff} object.
   */
  @PostMapping("/staff/create")
  @ApiOperation(value = "Lets an authenticated manager create a new staff user",
      consumes = "application/json")
  public ResponseEntity<Staff> createStaff(
      @Valid
      @RequestBody
      @ApiParam("Staff details for the new user")
          StaffDto staffDto
  ) {
    // Assuming in general staff entered will be active ones
    Staff createdStaff = staffService.createStaff(staffDto.toStaff());

    return ResponseEntity.ok().body(createdStaff);
  }

  /**
   * Get endpoint for all active staff members.
   *
   * @return List of all active staff members.
   */
  @GetMapping("/staff/get")
  @ApiOperation(value = "Lets an authenticated manager view list of all active staff")
  public List<Staff> getActiveStaff() {
    return staffService.getActiveStaff();
  }

  /**
   * Endpoint to update the information of a staff member.
   *
   * @param id           The ID of the staff member to be updated.
   * @param updatedStaff Updated staff information.
   * @return The updated {@link Staff} member.
   */
  @PutMapping("/staff/{id}")
  @ApiOperation(value = "Lets an authenticated manager update a staff member")
  public Staff updateStaff(
      @PathVariable
      @ApiParam(value = "Staff ID")
          int id,
      @RequestBody
      @ApiParam(value = "Updated staff object")
          StaffDto updatedStaff
  ) {
    return staffService.updateStaff(id, updatedStaff);
  }

  /**
   * Endpoint for the manager to remove a staff member by a given id.
   *
   * @param id staff id to remove.
   * @return An updated list of active staff members.
   */
  @PutMapping("/staff/remove")
  @ApiOperation(value = "Allows manager to remove a user with a given id and returns "
      + "an updated list of active users")
  public List<Staff> removeStaffMember(
      @RequestParam(name = "id", required = true)
          int id
  ) {
    staffService.removeStaff(id);
    return staffService.getActiveStaff();
  }
}
