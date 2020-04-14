package com.rota.database.orm.engagement;

import com.rota.database.orm.DbColumn;
import com.rota.database.orm.DbTableEntry;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Engagement implements DbTableEntry {
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
  public Map<DbColumn,Object> getPropertyMap() {
    return new HashMap<>() {
      {
        put(EngagementDbColumn.ID, id);
        put(EngagementDbColumn.START, Timestamp.from(start));
        put(EngagementDbColumn.END, Timestamp.from(end));
        put(EngagementDbColumn.TYPE, type.toString());
        put(EngagementDbColumn.HOURS_WORKED, hoursWorked);
        put(EngagementDbColumn.STAFF_ID, staffId);
      }
    };
  }
}
