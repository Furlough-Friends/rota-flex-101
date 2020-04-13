package com.rota.database.orm;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class EngagementMapper implements RowMapper {
  @Override
  public Engagement mapRow(ResultSet rs, int rowNum) throws SQLException {
    return new Engagement.EngagementBuilder()
        .id(rs.getInt("ID"))
        .start(rs.getTimestamp("START"))
        .end(rs.getTimestamp("END"))
        .type(EngagementType.valueOf(rs.getString("TYPE")))
        .hoursWorked(rs.getDouble("HOURS_WORKED"))
        .staffId(rs.getInt("STAFF_ID"))
        .build();
  }
}
