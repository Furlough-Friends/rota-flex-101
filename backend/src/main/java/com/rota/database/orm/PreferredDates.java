package com.rota.database.orm;

import java.util.HashMap;
import java.util.Map;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PreferredDates {
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
  public Map<String,Object> getPropertyMap() {
    return new HashMap<>() {
      {
        put("staff_id", staffId);
        put("monday", monday);
        put("tuesday", tuesday);
        put("wednesday", wednesday);
        put("thursday", thursday);
        put("friday", friday);
        put("saturday", saturday);
        put("sunday", sunday);
      }
    };
  }
}
