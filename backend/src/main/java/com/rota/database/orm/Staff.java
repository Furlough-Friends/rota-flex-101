package com.rota.database.orm;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Staff {
  private int id;
  private String firstName;
  private String surname;
  private boolean active;
  private LocalDate startDate;
  private double contractedHours;
  private double hourlyRate;
  private Role role;
  private String jobTitle;

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