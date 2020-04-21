package com.rota.api;

import com.rota.api.dto.EngagementDto;
import com.rota.api.dto.form.CreateStaffForm;
import com.rota.auth.AuthenticationUtils;
import com.rota.database.orm.engagement.EngagementRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
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
  EngagementRepository engagementRepository;

  private List<EngagementDto> getStaffEngagementsBetween(int staffId, Instant start, Instant end) {
    return engagementRepository.findByStaffId(staffId).stream()
        .filter(engagement ->
            engagement.getStart().isAfter(start)
                && engagement.getEnd().isBefore(end))
        .map(EngagementDto::fromEngagement)
        .collect(Collectors.toList());
  }

  /**
   * Returns all shifts of a given staff ember.
   * Staff ID is inferred from the token passed in the header's Authorization field.
   *
   * @param authString Authentication token.
   * @return List of all available shifts.
   */
  @GetMapping("/myShifts")
  @ApiOperation(value = "Returns shifts of an authenticated user. User is inferred from the "
      + "authentication token passed in a header", response = EngagementDto[].class)
  public List<EngagementDto> getMyShifts(
      @RequestHeader("Authorization")
      @ApiParam(value = "Authentication token", required = true)
          String authString,

      @RequestParam(name = "start", required = false)
      @ApiParam(value = "start time")
          Instant start,

      @RequestParam(name = "end", required = false)
      @ApiParam(value = "end time")
          Instant end
  ) {
    final Optional<String> user = AuthenticationUtils.getUserFromToken(authString);
    user.orElseThrow(
        () -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Failed to authorize.")
    );

    int staffId;
    try {
      staffId = Integer.parseInt(user.get());
    } catch (NumberFormatException e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid user ID format in the "
          + "token.");
    }

    Instant startTime = start == null ? Instant.MIN : start;
    Instant endTime = end == null ? Instant.MAX : end;
    return getStaffEngagementsBetween(staffId, startTime, endTime);
  }

  @PostMapping("/staff/create")
  @ApiOperation(value = "Lets an authenticated manager create a new staff user",
      consumes = "application/json")
  public ResponseEntity createStaff(
      @RequestHeader("Authorization")
      @ApiParam(value = "Authentication token", required = true)
          String authString,

      @Valid
      @RequestBody
      @ApiParam("Staff details for the new user")
          CreateStaffForm createStaffForm
  ) {
    return ResponseEntity.accepted().build();
  }
}
