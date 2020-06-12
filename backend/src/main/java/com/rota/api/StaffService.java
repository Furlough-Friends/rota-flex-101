package com.rota.api;

import com.rota.api.dto.EngagementDto;
import com.rota.api.dto.StaffDto;
import com.rota.database.orm.engagement.Engagement;
import com.rota.database.orm.engagement.EngagementRepository;
import com.rota.database.orm.staff.Staff;
import com.rota.database.orm.staff.StaffRepository;
import com.rota.exceptions.DuplicateEmailException;
import com.rota.exceptions.StaffNotFoundException;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.Predicate;
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
   * Checks if the engagement has any overlap with the requested time frame.
   * 
   * @param start start time
   * @param end end time
   * @return true if engagement times have any overlap with requested times
   */
  private Predicate<Engagement> isEngagementBetween(Instant start, Instant end) {
    Instant startTime = start == null ? Instant.MIN : start;
    Instant endTime = end == null ? Instant.MAX : end;

    return (Engagement engagement) -> !endTime.isBefore(startTime)
        && !engagement.getEnd().isBefore(startTime)
        && !engagement.getStart().isAfter(endTime);
  }

  /**
   * Truncates the engagement, e.g. if if starts before the start time the function will cut off the
   * time difference and set the engagement start time to requested start time.
   */
  private Function<Engagement, Engagement> truncateEngagement(Instant start, Instant end) {
    Instant startTime = start == null ? Instant.MIN : start;
    Instant endTime = end == null ? Instant.MAX : end;

    return (Engagement engagement) -> {
      if (engagement.getStart().isBefore(startTime)) {
        engagement.setStart(startTime);
      }
      if (engagement.getEnd().isAfter(endTime)) {
        engagement.setEnd(endTime);
      }
      return engagement;
    };
  }

  /**
   * Returns staff member's engagements between start and end dates (inclusive).
   * Engagements that go through start or end times are truncated.
   * Both start and end dates are optional and can be left as null.
   *
   * @param staffId Staff member's ID
   * @param start   start date or null to get from the beginning
   * @param end     end date
   * @return A list of member's engagements
   */
  public List<EngagementDto> getStaffEngagementsBetween(int staffId, Instant start, Instant end) {
    return engagementRepository.findByStaffId(staffId).stream()
        .filter(isEngagementBetween(start, end))
        .map(truncateEngagement(start, end))
        .map(EngagementDto::fromEngagement)
        .collect(Collectors.toList());
  }

  /**
   * Returns all engagements between start and end dates (inclusive).
   * Engagements that go through start or end times are truncated.
   * Both start and end dates are optional and can be left as null.
   * 
   * @param start start date or null to get from the beginning
   * @param end end date or null to get to the end
   * @return All engagements between the two dates
   */
  public List<EngagementDto> getAllEngagementsBetween(Instant start, Instant end) {
    return engagementRepository.findAll().stream()
        .filter(isEngagementBetween(start, end))
        .map(truncateEngagement(start, end))
        .map(EngagementDto::fromEngagement)
        .collect(Collectors.toList());
  }

  private Optional<Engagement> fromDto(EngagementDto engagement) {
    Optional<Staff> staffOptional = staffRepository.findById(engagement.getStaffId());
    return staffOptional.map((Staff staff) -> 
    Engagement
        .builder()
        .staff(staff)
        .start(engagement.getStart())
        .end(engagement.getEnd())
        .type(engagement.getType())
        .build()
    );

  }

  /**
   * Adds an engagement to the database.
   */
  public void addEngagement(EngagementDto engagementDto) {
    Optional<Engagement> engagementOptional = fromDto(engagementDto);
    engagementOptional.ifPresentOrElse(
        (Engagement engagement) -> engagementRepository.save(engagement),
        () -> {
          throw new StaffNotFoundException();
        });
  }

  /**
   * Adds a new staff entity to the database.
   *
   * @param newStaff {@link Staff} to be added.
   * @return {@link Staff} object which has just been created.
   */
  public StaffDto createStaff(StaffDto newStaff) {
    findStaffByEmail(newStaff.getEmail()).ifPresent(
        (Staff staff) -> {
          throw new DuplicateEmailException(newStaff.getEmail());
        });
    return StaffDto.of(staffRepository.save(newStaff.toStaff()));
  }

  /**
   * Returns the list of all active staff members.
   *
   * @return A list of all active staff members.
   */
  public List<StaffDto> getActiveStaff() {
    return staffRepository.findAll().stream()
        .filter(staff -> !staff.isInactive())
        .map(StaffDto::of)
        .collect(Collectors.toList());
  }

  /**
   * Deactivates staff member with given id.
   *
   * @param id ID of staff member to deactivate
   */
  public void removeStaff(int id) {
    Optional<Staff> staffMember = staffRepository.findById(id);
    staffMember.ifPresent(staff -> {
      staff.setInactive(true);
      staff.setFirstName("");
      staff.setSurname("");
      staff.setEmail(null);
      staffRepository.save(staff);
    });
  }

  /**
   * Get a user object from database via email.
   *
   * @param email the user email
   * @return {@link Staff} optional
   */
  public Optional<Staff> findStaffByEmail(String email) {
    return staffRepository.findAll().stream()
        .filter(staff -> staff
            .getEmail().isPresent() && staff.getEmail().get().equalsIgnoreCase(email))
        .findFirst();
  }

  /**
   * Updates a staff member in the database.
   *
   * @param updatedStaff Updated staff details.
   * @return The updated {@link Staff} member.
   */
  public StaffDto updateStaff(StaffDto updatedStaff) {
    // Check to see if that staff member exists, throw exception if not.
    staffRepository.findById(updatedStaff.getId())
        .orElseThrow(() -> new StaffNotFoundException(updatedStaff.getId()));
    // If it exists, safe new staff information to that ID.
    return StaffDto.of(staffRepository.save(updatedStaff.toStaff()));
  }
}