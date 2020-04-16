package com.rota.api;

import com.rota.api.dto.EngagementDto;
import com.rota.auth.AuthenticationUtils;
import com.rota.database.orm.engagement.EngagementRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@Api(value = "Manages the responses to staff-related queries")
public class StaffController {
  @Autowired
  EngagementRepository engagementRepository;

  private List<EngagementDto> getEngagementDtos(int staffId) {
    return engagementRepository.findByStaffId(staffId).stream()
        .map(EngagementDto::fromEngagement)
        .collect(Collectors.toList());
  }

  /**
   * Returns all shifts of a given staff ember.
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
      String authString
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
    return getEngagementDtos(staffId);
  }
}
