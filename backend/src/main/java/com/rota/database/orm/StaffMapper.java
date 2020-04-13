package com.rota.database.orm;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class StaffMapper implements RowMapper {
  @Override
  public Staff mapRow(ResultSet rs, int rowNum) throws SQLException {
    return new Staff(
        rs.getInt("ID"),
        rs.getString("FIRST_NAME"),
        rs.getString("SURNAME"),
        rs.getBoolean("ACTIVE"),
        rs.getDate("START_DATE").toLocalDate(),
        rs.getDouble("CONTRACTED_HOURS"),
        rs.getDouble("HOURLY_RATE"),
        Role.valueOf(rs.getString("ROLE")),
        rs.getString("JOB_TITLE")
    );
  }
}
