package com.rota.api;

import com.rota.api.dto.EngagementDto;
import com.rota.api.dto.StaffDto;
import com.rota.auth.Authentication;
import com.rota.database.orm.staff.Role;
import com.rota.database.orm.staff.Staff;
import com.rota.exceptions.EngagementNotFoundException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.Authorization;
import java.time.Instant;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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

  /**
   * Returns the currently authenticated users role.
   *
   * @return the {@link Role}
   */
  @GetMapping("/role")
  @ApiOperation(value = "Get the current user role.", response = Role.class, authorizations = {
      @Authorization(value = "Bearer")})
  public Role getRole() {
    return authentication.getUserFromEmail()
        .orElseThrow(EngagementNotFoundException::new)
        .getRole();
  }

  /**
   * Returns all shifts of a given staff member.
   * Staff ID is inferred from the token passed in the header's Authorization field.
   *
   * @return List of all available shifts.
   */
  @GetMapping("/myShifts")
  @ApiOperation(value = "Returns shifts of an authenticated user.",
      response = EngagementDto[].class, authorizations = {@Authorization(value = "Bearer")})
  public List<EngagementDto> getMyShifts(
      @RequestParam(name = "start", required = false)
      @ApiParam(value = "start time")
          Instant start,

      @RequestParam(name = "end", required = false)
      @ApiParam(value = "end time")
          Instant end
  ) {
    final Staff staff = authentication.getUserFromEmail().orElseThrow(
        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, STAFF_NOT_FOUND_MESSAGE));

    return staffService.getStaffEngagementsBetween(staff.getId(), start, end);
  }

  /**
   * Returns shifts of all staff members.

   * @param start Start time or null.
   * @param end End time or null.
   * @return List of all shifts between start and end times.
   */
  @GetMapping("/staff/shifts")
  @ApiOperation(value = "Returns shifts of all users in a specified time frame.",
        response = EngagementDto[].class, authorizations = {@Authorization(value = "Bearer")})
  public List<EngagementDto> getAllShifts(
      @RequestParam(name = "start", required = false)
      @ApiParam(value = "start time")
          Instant start,

      @RequestParam(name = "end", required = false)
      @ApiParam(value = "end time")
          Instant end
  ) {
    return staffService.getAllEngagementsBetween(start, end);
  }

  /**
   * Endpoint to create and enter a new staff record into the system.
   * Staff ID and role is inferred from the token passed in the header's Authorization field.
   *
   * @param staffDto Staff details.
   * @return A Response entity of a {@link Staff} object.
   */
  @PostMapping("/staff")
  @ApiOperation(value = "Lets an authenticated manager create a new staff user",
      consumes = "application/json", authorizations = {@Authorization(value = "Bearer")})
  public ResponseEntity<StaffDto> createStaff(
      @Valid
      @RequestBody
      @ApiParam("Staff details for the new user")
          StaffDto staffDto
  ) {
    // Assuming in general staff entered will be active ones
    StaffDto createdStaff = staffService.createStaff(staffDto);

    return ResponseEntity.ok().body(createdStaff);
  }

  /**
   * Get endpoint for all active staff members.
   *
   * @return List of all active staff members.
   */
  @GetMapping("/staff")
  @ApiOperation(value = "Lets an authenticated manager view list of all active staff",
      authorizations = {@Authorization(value = "Bearer")})
  public List<StaffDto> getActiveStaff() {
    return staffService.getActiveStaff();
  }

  /**
   * Endpoint to update the information of a staff member.
   *
   * @param updatedStaff Updated staff information.
   * @return The updated {@link Staff} member.
   */
  @PutMapping("/staff")
  @ApiOperation(value = "Lets an authenticated manager update a staff member", authorizations = {
      @Authorization(value = "Bearer")})
  public StaffDto updateStaff(
      @Valid
      @RequestBody
      @ApiParam(value = "Updated staff object")
          StaffDto updatedStaff
  ) {
    return staffService.updateStaff(updatedStaff);
  }

  /**
   * Endpoint for the manager to remove a staff member by a given id.
   *
   * @param id staff id to remove.
   * @return An updated list of active staff members.
   */
  @DeleteMapping("/staff/{id}")
  @ApiOperation(value = "Allows manager to remove a user with a given id and returns "
      + "an updated list of active users", authorizations = {@Authorization(value = "Bearer")})
  public List<StaffDto> removeStaffMember(
      @PathVariable(name = "id", required = true)
          int id
  ) {
    staffService.removeStaff(id);
    return staffService.getActiveStaff();
  }

  /**
   * Endpoint for the manager to add staff member's engagement.
   */
  @PostMapping("/staff/addEngagement")
  @ApiOperation(value = "Allows manager to add an engagement for a certain user", authorizations = {
      @Authorization(value = "Bearer") })
  public void addEngagement(
      @Valid 
      @RequestBody 
      EngagementDto engagement
  ) {
    staffService.addEngagement(engagement);
  }

  @PutMapping("/staff/engagement")
  @ApiOperation(value = "Allows manager to update an existing engagement", authorizations = {
      @Authorization(value = "Bearer") })
  public List<EngagementDto> updateEngagement(@Valid @RequestBody EngagementDto engagement) {
    staffService.updateEngagement(engagement);
    return staffService.getAllEngagementsBetween(null, null);
  }
}
