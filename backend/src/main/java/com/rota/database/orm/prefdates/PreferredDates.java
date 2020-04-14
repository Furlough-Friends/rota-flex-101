package com.rota.database.orm.prefdates;

import com.rota.database.orm.DbColumn;
import com.rota.database.orm.DbTableEntry;
import java.util.HashMap;
import java.util.Map;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PreferredDates implements DbTableEntry {
  int staffId;
  boolean monday;
  boolean tuesday;
  boolean wednesday;
  boolean thursday;
  boolean friday;
  boolean saturday;
  boolean sunday;

  /**
   * Returns a map between the database column name and the object value.
   * @return Map
   */
  public Map<DbColumn,Object> getPropertyMap() {
    return new HashMap<>() {
      {
        put(PreferredDatesDbColumn.STAFF_ID, staffId);
        put(PreferredDatesDbColumn.MONDAY, monday);
        put(PreferredDatesDbColumn.TUESDAY, tuesday);
        put(PreferredDatesDbColumn.WEDNESDAY, wednesday);
        put(PreferredDatesDbColumn.THURSDAY, thursday);
        put(PreferredDatesDbColumn.FRIDAY, friday);
        put(PreferredDatesDbColumn.SATURDAY, saturday);
        put(PreferredDatesDbColumn.SUNDAY, sunday);
      }
    };
  }
}
