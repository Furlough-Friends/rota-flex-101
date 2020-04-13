package com.rota.database.orm;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Staff {
  int id;
  String firstName;
  String surname;
  boolean active;
  LocalDate startDate;
  double contractedHours;
  double hourlyRate;
  Role role;
  String jobTitle;

  /**
   * Returns a map between the database column name and the object value.
   * Enum types must be converted to String to be understood by JDBC.
   * Dates need to be converted to and from LocalDate otherwise Spotbugs complains about security.
   * @return Map
   */
  public Map<String,Object> getPropertyMap() {
    return new HashMap<>() {
      {
        put("id", id);
        put("first_name", firstName);
        put("surname", surname);
        put("start_date", Date.valueOf(startDate));
        put("contracted_hours", contractedHours);
        put("hourly_rate", hourlyRate);
        put("role", role.toString());
        put("job_title", jobTitle);
      }
    };
  }
}