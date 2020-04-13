package com.rota.database;

import com.rota.database.orm.Role;
import com.rota.database.orm.Staff;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Optional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.test.context.ContextConfiguration;

@JdbcTest
@ContextConfiguration(classes = DbHandler.class)
class DbHandlerTests {
  @Autowired
  DbHandler dbHandler;

  static final Staff.StaffBuilder STAFF_BUILDER = Staff.builder()
      .id(1)
      .firstName("Grzegorz")
      .surname("Brzeczyszczykiewicz")
      .active(true)
      .startDate(LocalDate.of(2020, 4, 12))
      .contractedHours(10.0)
      .hourlyRate(40.0)
      .role(Role.USER)
      .jobTitle("Sprzatacz");

  static final Staff STAFF_MEMBER = STAFF_BUILDER.build();

  @BeforeEach
  void wipeDb() {
    dbHandler.wipeDb();
  }

  @Test
  void readFromEmptyDb() {
    Assertions.assertEquals(
        Optional.empty(),
        dbHandler.getStaffMember(1)
    );
  }

  @Test
  void addStaff() {
    dbHandler.addStaff(STAFF_MEMBER);
    Assertions.assertEquals(
        Optional.of(STAFF_MEMBER),
        dbHandler.getStaffMember(1)
    );
  }

  @Test
  void modifyStaff() {
    final String newName = "Szczepan";
    final double newHours = 42.0;
    final Staff updatedStaff = STAFF_BUILDER
        .firstName(newName)
        .contractedHours(newHours)
        .build();
    dbHandler.addStaff(STAFF_MEMBER);
    dbHandler.updateStaff(1, new HashMap<>() {
          {
            put("FIRST_NAME", newName);
            put("CONTRACTED_HOURS", newHours);
          }
        }
    );
    Assertions.assertEquals(
        updatedStaff,
        dbHandler.getStaffMember(1).get()
    );
  }

  @Test
  void removeStaff() {
    dbHandler.addStaff(STAFF_MEMBER);
    dbHandler.removeStaff(1);
    Assertions.assertEquals(
        Optional.empty(),
        dbHandler.getStaffMember(1)
    );
  }
}
