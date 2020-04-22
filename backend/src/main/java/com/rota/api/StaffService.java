package com.rota.api;

import com.rota.api.dto.EngagementDto;
import com.rota.database.orm.engagement.EngagementRepository;
import com.rota.database.orm.staff.Staff;
import com.rota.database.orm.staff.StaffRepository;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StaffService {
  @Autowired
  EngagementRepository engagementRepository;

  @Autowired
  StaffRepository staffRepository;

  /**
   * Returns staff member's engagements between start and end dates (inclusive).
   * Specifically engagements that start after the start date and end before the end date.
   * Both start and end dates are optional and can be left as null.
   *
   * @param staffId Staff member's ID
   * @param start start date or null to get from the beginning
   * @param end end date
   * @return A list of member's engagements
   */
  public List<EngagementDto> getStaffEngagementsBetween(int staffId, Instant start, Instant end) {
    Instant startTime = start == null ? Instant.MIN : start;
    Instant endTime = end == null ? Instant.MAX : end;
    return engagementRepository.findByStaffId(staffId).stream()
        .filter(engagement ->
            (engagement.getStart().equals(start)
                || engagement.getStart().isAfter(startTime))
          && (engagement.getEnd().equals(endTime)
                || engagement.getEnd().isBefore(endTime)))
        .map(EngagementDto::fromEngagement)
        .collect(Collectors.toList());
  }

  /**
   * Adds a new staff entity to the database.
   *
   * @param newStaff {@link Staff} to be added.
   * @return {@link Staff} object which has just been created.
   */
  public Staff createStaff(Staff newStaff) {
    return staffRepository.save(newStaff);
  }
}