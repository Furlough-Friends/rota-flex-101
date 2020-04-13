package com.rota.database.orm;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Engagement {
  private int id;
  private Timestamp start;
  private Timestamp end;
  private EngagementType type;
  private double hoursWorked;
  private int staffId;

  public Map<String,Object> getPropertyMap() {
    return new HashMap<>() {
      {
        put("id", id);
        put("start", start);
        put("end", end);
        put("type", type.toString());
        put("hours_worked", hoursWorked);
        put("staff_id", staffId);
      }
    };
  }
}
