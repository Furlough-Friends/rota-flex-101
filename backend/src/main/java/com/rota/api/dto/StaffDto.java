package com.rota.api.dto;

import com.rota.database.orm.staff.Role;
import com.rota.database.orm.staff.Staff;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDate;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Value;

@Value
@AllArgsConstructor
public class StaffDto {
  @ApiModelProperty(value = "Staff ID, ignored when creating new staff", required = false)
  int id;

  @NotNull
  @ApiModelProperty(value = "First name", required = true)
  String firstName;

  @NotNull
  @ApiModelProperty(value = "Last name", required = true)
  String surname;

  @NotNull
  @ApiModelProperty(value = "Action permissions for the employee, USER or MANAGER", required = true)
  Role role;

  @ApiModelProperty("Starting date of employment")
  LocalDate startDate;

  @Min(0)
  @ApiModelProperty("Employment contracted hours")
  double contractedHours;

  @Min(0)
  @ApiModelProperty("Hourly pay")
  double hourlyRate;

  @ApiModelProperty("Job title of employee")
  String jobTitle;

  @ApiModelProperty("Preferred working dates of the employee")
  String preferredDates;

  @ApiModelProperty("Is the staff currently inactive")
  boolean inactive;

  @ApiModelProperty("The user's email address")
  @NotNull
  @Email
  String email;

  /**
   * Converts this object to a {@link Staff}.
   * The <code>active</code> field is st as <code>true</code>
   * @return {@link Staff} with <code>active</code> set to <code>true</code>
   */
  public Staff toStaff() {
    return Staff.builder()
        .id(id)
        .firstName(firstName)
        .surname(surname)
        .role(role)
        .inactive(inactive)
        .startDate(startDate)
        .contractedHours(contractedHours)
        .hourlyRate(hourlyRate)
        .jobTitle(jobTitle)
        .preferredDates(preferredDates)
        .email(email)
        .build();
  }

  /**
   * Converts database Staff object to StaffDto.
   * 
   * @param staff Staff object
   * @return converted StaffDto
   */
  public static StaffDto of(Staff staff) {
    return new StaffDto(
        staff.getId(),
        staff.getFirstName(),
        staff.getSurname(),
        staff.getRole(),
        staff.getStartDate(),
        staff.getContractedHours(),
        staff.getHourlyRate(),
        staff.getJobTitle(),
        staff.getPreferredDates(),
        staff.isInactive(),
        staff.getEmail().orElse("")
    );
  }
}
