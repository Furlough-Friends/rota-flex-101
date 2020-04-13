package com.rota.database.orm;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Engagement {
  int id;
  Instant start;
  Instant end;
  EngagementType type;
  double hoursWorked;
  int staffId;

  /**
   * Returns a map between the database column name and the object value.
   * Enum types must be converted to String to be understood by JDBC.
   * DateTimes need to be converted to and from Timestamp otherwise Spotbugs complains about
   * security.
   * @return Map
   */
  public Map<String,Object> getPropertyMap() {
    return new HashMap<>() {
      {
        put("id", id);
        put("start", Timestamp.from(start));
        put("end", Timestamp.from(end));
        put("type", type.toString());
        put("hours_worked", hoursWorked);
        put("staff_id", staffId);
      }
    };
  }
}
