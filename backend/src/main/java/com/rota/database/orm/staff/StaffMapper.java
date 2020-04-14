package com.rota.database.orm.staff;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class StaffMapper implements RowMapper {
  @Override
  public Staff mapRow(ResultSet rs, int rowNum) throws SQLException {
    return Staff.builder()
        .id(rs.getInt("ID"))
        .firstName(rs.getString("FIRST_NAME"))
        .surname(rs.getString("SURNAME"))
        .active(rs.getBoolean("ACTIVE"))
        .startDate(rs.getDate("START_DATE").toLocalDate())
        .contractedHours(rs.getDouble("CONTRACTED_HOURS"))
        .hourlyRate(rs.getDouble("HOURLY_RATE"))
        .role(Role.valueOf(rs.getString("ROLE")))
        .jobTitle(rs.getString("JOB_TITLE"))
        .build();
  }
}
