package com.rota.api.dto;

import com.rota.database.orm.staff.Role;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Value;

@Value
@AllArgsConstructor
public class StaffDto {
  @ApiModelProperty("First name")
  String firstName;

  @ApiModelProperty("Last name")
  String surname;

  @ApiModelProperty("Action permissions for employee, USER or MANAGER")
  Role role;

  @ApiModelProperty("Starting date of employment")
  LocalDate startDate;

  @ApiModelProperty("Employment contracted hours")
  double contractedHours;

  @ApiModelProperty("Hourly pay")
  double hourlyRate;

  @ApiModelProperty("Job title of employee")
  String jobTitle;

  @ApiModelProperty("Preferred working dates of the employee")
  String preferredDates;

  @ApiModelProperty("Is the staff currently inactive?")
  boolean inactive;
}
