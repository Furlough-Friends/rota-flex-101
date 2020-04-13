package com.rota.database.orm;

import java.util.HashMap;
import java.util.Map;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PreferredDates {
  private int staffId;
  private boolean monday;
  private boolean tuesday;
  private boolean wednesday;
  private boolean thursday;
  private boolean friday;
  private boolean saturday;
  private boolean sunday;

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
