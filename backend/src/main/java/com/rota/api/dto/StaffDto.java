package com.rota.api.dto;

import com.rota.database.orm.staff.Role;
import com.rota.database.orm.staff.Staff;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDate;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Value;

@Value
@AllArgsConstructor
public class StaffDto {
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

  /**
   * Converts this object to a {@link Staff}.
   * The <code>active</code> field is st as <code>true</code>
   * @return {@link Staff} with <code>active</code> set to <code>true</code>
   */
  public Staff toStaff() {
    return Staff.builder()
        .firstName(firstName)
        .surname(surname)
        .role(role)
        .inactive(inactive)
        .startDate(startDate)
        .contractedHours(contractedHours)
        .hourlyRate(hourlyRate)
        .jobTitle(jobTitle)
        .preferredDates(preferredDates)
        .build();
  }
}
