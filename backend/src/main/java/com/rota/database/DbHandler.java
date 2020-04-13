package com.rota.database;

import com.rota.database.orm.Engagement;
import com.rota.database.orm.EngagementMapper;
import com.rota.database.orm.Staff;
import com.rota.database.orm.StaffMapper;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DbHandler {
  @Autowired
  JdbcTemplate jdbcTemplate;

  /**
   * Erases all database entries.
   */
  public void wipeDb() {
    jdbcTemplate.update(
        "DELETE FROM STAFF WHERE TRUE;"
            + "DELETE FROM ENGAGEMENT WHERE TRUE;"
            + "DELETE FROM PREFERRED_DATES WHERE TRUE;"
    );
  }

  private Pair<List<String>, List<Object>> transposeMap(Map<String,Object> map) {
    List<String> keyList = map.keySet().stream()
        .map(String.class::cast)
        .collect(Collectors.toList());
    List<Object> valueList = keyList.stream()
        .map(map::get)
        .collect(Collectors.toList());
    return Pair.of(keyList, valueList);
  }

  private String sqlInsertString(String table, List<String> columns) {
    return "INSERT INTO " + table + "("
        + columns.stream().collect(Collectors.joining(","))
        + ") VALUES ("
        + columns.stream().map(col -> "?").collect(Collectors.joining(","))
        + ");";
  }

  private void addToTable(String table, Map<String,Object> properties) {
    Pair<List<String>,List<Object>> keyValues = transposeMap(properties);
    String sqlInsertString = sqlInsertString(table, keyValues.getFirst());
    jdbcTemplate.update(sqlInsertString, keyValues.getSecond().toArray());
  }

  /**
   * Adds a staff member.
   * @param staff Staff to add to database.
   */
  public void addStaff(Staff staff) {
    Map<String,Object> propertyMap = staff.getPropertyMap();
    propertyMap.remove("id"); // Remove primary key
    addToTable("STAFF", propertyMap);
  }

  public void addEngagement(Engagement engagement) {
    Map<String,Object> propertyMap = engagement.getPropertyMap();
    propertyMap.remove("id"); // Remove primary key
    addToTable("ENGAGEMENT", propertyMap);
  }

  private String sqlUpdateString(String table, List<String> updateCols, List<String> conditions) {
    return "UPDATE " + table + " SET "
        + updateCols.stream()
        .map(col -> col + "=?")
        .collect(Collectors.joining(","))
        + " WHERE "
        + conditions.stream()
        .map(condition -> condition + "=?")
        .collect(Collectors.joining(" AND "))
        + ";";
  }

  private void updateTable(String table, Map<String,Object> columns,
                           Map<String,Object> conditions) {
    Pair<List<String>,List<Object>> colUpdates = transposeMap(columns);
    Pair<List<String>,List<Object>> colConditions = transposeMap(conditions);
    String sqlQuery = sqlUpdateString(table, colUpdates.getFirst(), colConditions.getFirst());
    Object[] combinedValues = Stream.concat(
        colUpdates.getSecond().stream(),
        colConditions.getSecond().stream()
    ).toArray();
    jdbcTemplate.update(sqlQuery, combinedValues);
  }

  /**
   * Updates staff member in the database.
   * @param id Staff ID
   * @param update A map with (property name) -> (updated value)
   */
  public void updateStaff(int id, Map<String, Object> update) {
    updateTable("STAFF", update, new HashMap<>() {
          {
            put("ID", id);
          }
        }
    );
  }

  public void updateEngagement(int id, Map<String, Object> update) {
    updateTable("ENGAGEMENT", update, new HashMap<>() {
          {
            put("ID", id);
          }
        }
    );
  }

  /**
   * Removes a staff member with a given id.
   * @param id id of member to remove
   */
  public void removeStaff(int id) {
    jdbcTemplate.update(
        "DELETE FROM STAFF WHERE ID=?;",
        id);
  }

  public void removeEngagement(int id) {
    jdbcTemplate.update(
        "DELETE FROM ENGAGEMENT WHERE ID=?;",
        id);
  }

  /**
   * Returns a list of all staff members currently in the db.
   * @return list of all staff members
   */
  public List<Staff> getAllStaff() {
    return jdbcTemplate.query(
        "SELECT * FROM STAFF;",
        new StaffMapper()
    );
  }

  /**
   * Selects a staff member with a given id if present.
   * @param id staff member ID
   * @return Optional wrapping the Staff object if present, empty optional otherwise.
   */
  public Optional<Staff> getStaffMember(Integer id) {
    List<Staff> members = jdbcTemplate.query(
        "SELECT * FROM STAFF WHERE ID=?;",
        new Object[]{id},
        new StaffMapper()
        );
    return members.isEmpty()
        ? Optional.empty()
        : Optional.of(members.get(0));
  }

  public List<Engagement> getEngagements(int staffId) {
    return jdbcTemplate.query(
      "SELECT * FROM ENGAGEMENT WHERE STAFF_ID=?;",
      new Object[]{staffId},
      new EngagementMapper()
    );
  }
}
