package com.rota.api;

import com.rota.api.dto.EngagementDto;
import com.rota.auth.AuthenticationUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@Api(value = "Manages the responses to staff-related queries")
public class StaffController {
  @Autowired
  StaffService staffService;

  /**
   * Returns all shifts of a given staff member.
   * Staff ID is inferred from the token passed in the header's Authorization field.
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
    if (!AuthenticationUtils.validateToken(authString)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Failed to authorize.");
    }

    final Optional<Integer> user = AuthenticationUtils.getUserFromToken(authString);
    user.orElseThrow(
        () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid user ID format in the "
            + "token.")
    );

    return staffService.getStaffEngagementsBetween(user.get(), start, end);
  }
}
