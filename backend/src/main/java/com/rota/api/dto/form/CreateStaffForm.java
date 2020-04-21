package com.rota.api.dto.form;

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
public class CreateStaffForm {
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

  //Active is not as a field here as it would default to false which would be wrong most of the time

  /**
   * Converts this object to a {@link Staff}.
   * The <code>active</code> field is st as <code>true</code>
   * @return {@link Staff} wit <code>active</code> set to <code>true</code>
   */
  public Staff toActiveStaff() {
    return Staff.builder()
        .firstName(firstName)
        .surname(surname)
        .role(role)
        .active(true)
        .startDate(startDate)
        .contractedHours(contractedHours)
        .hourlyRate(hourlyRate)
        .jobTitle(jobTitle)
        .preferredDates(preferredDates)
        .build();
  }
}
