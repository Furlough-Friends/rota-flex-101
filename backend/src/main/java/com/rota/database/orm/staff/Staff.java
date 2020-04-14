package com.rota.database.orm.staff;

import com.rota.database.orm.DbColumn;
import com.rota.database.orm.DbTableEntry;
import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Staff implements DbTableEntry {
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
  public Map<DbColumn,Object> getPropertyMap() {
    return new HashMap<>() {
      {
        put(StaffDbColumn.ID, id);
        put(StaffDbColumn.FIRST_NAME, firstName);
        put(StaffDbColumn.SURNAME, surname);
        put(StaffDbColumn.ACTIVE, active);
        put(StaffDbColumn.START_DATE, Date.valueOf(startDate));
        put(StaffDbColumn.CONTRACTED_HOURS, contractedHours);
        put(StaffDbColumn.HOURLY_RATE, hourlyRate);
        put(StaffDbColumn.ROLE, role.toString());
        put(StaffDbColumn.JOB_TITLE, jobTitle);
      }
    };
  }
}