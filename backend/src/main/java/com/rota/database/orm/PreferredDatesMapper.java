package com.rota.database.orm;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class PreferredDatesMapper implements RowMapper {
  @Override
  public PreferredDates mapRow(ResultSet rs, int rowNum) throws SQLException {
    return PreferredDates.builder()
        .staffId(rs.getInt("STAFF_ID"))
        .monday(rs.getBoolean("MONDAY"))
        .tuesday(rs.getBoolean("TUESDAY"))
        .wednesday(rs.getBoolean("WEDNESDAY"))
        .thursday(rs.getBoolean("THURSDAY"))
        .friday(rs.getBoolean("FRIDAY"))
        .saturday(rs.getBoolean("SATURDAY"))
        .sunday(rs.getBoolean("SUNDAY"))
        .build();
  }
}
