package com.rota.database;

import com.rota.database.orm.Engagement;
import com.rota.database.orm.EngagementType;
import com.rota.database.orm.PreferredDates;
import com.rota.database.orm.Role;
import com.rota.database.orm.Staff;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;

@JdbcTest
@ContextConfiguration(classes = DbHandler.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class DbHandlerTests {
  @Autowired
  DbHandler dbHandler;

  static final int STAFF_ID = 5;
  static final int ENGAGEMENT_ID = 9;
  static final Staff.StaffBuilder STAFF_BUILDER = Staff.builder()
      .id(STAFF_ID)
      .firstName("Grzegorz")
      .surname("Brzeczyszczykiewicz")
      .active(true)
      .startDate(LocalDate.of(2020, 4, 12))
      .contractedHours(10.0)
      .hourlyRate(40.0)
      .role(Role.USER)
      .jobTitle("Sprzatacz");

  static final Engagement.EngagementBuilder ENGAGEMENT_BUILDER = Engagement.builder()
      .id(ENGAGEMENT_ID)
      .staffId(STAFF_ID)
      .type(EngagementType.SHIFT);

  static final PreferredDates.PreferredDatesBuilder PREFERRED_DATES_BUILDER =
      PreferredDates.builder()
      .staffId(STAFF_ID);

  static final Engagement ENGAGEMENT_1 = ENGAGEMENT_BUILDER
      .start(Instant.parse("2020-04-13T00:00:00Z"))
      .end(Instant.parse("2020-04-13T20:00:00Z"))
      .build();

  static final Engagement ENGAGEMENT_2 = ENGAGEMENT_BUILDER
      .id(ENGAGEMENT_ID + 1)
      .start(Instant.parse("2020-04-12T10:00:00Z"))
      .end(Instant.parse("2020-04-15T18:00:00Z"))
      .build();

  static final Staff STAFF_MEMBER = STAFF_BUILDER.build();

  static final PreferredDates PREFERRED_DATES = PREFERRED_DATES_BUILDER.build();

  @BeforeEach
  void wipeDb() {
    dbHandler.wipeDb();
  }

  @Test
  void readFromEmptyDb() {
    Assertions.assertEquals(
        Optional.empty(),
        dbHandler.getStaffMember(STAFF_ID)
    );
  }

  @Test
  void addStaff() {
    dbHandler.addStaff(STAFF_MEMBER);
    Assertions.assertEquals(
        Optional.of(STAFF_MEMBER),
        dbHandler.getStaffMember(STAFF_ID)
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
    dbHandler.updateStaff(STAFF_ID, new HashMap<>() {
          {
            put("FIRST_NAME", newName);
            put("CONTRACTED_HOURS", newHours);
          }
        }
    );
    Assertions.assertEquals(
        updatedStaff,
        dbHandler.getStaffMember(STAFF_ID).get()
    );
  }

  @Test
  void removeStaff() {
    dbHandler.addStaff(STAFF_MEMBER);
    dbHandler.removeStaff(STAFF_ID);
    Assertions.assertEquals(
        Optional.empty(),
        dbHandler.getStaffMember(STAFF_ID)
    );
  }

  @Test
  void addMultipleEngagements() {
    dbHandler.addStaff(STAFF_MEMBER);
    dbHandler.addEngagement(ENGAGEMENT_1);
    dbHandler.addEngagement(ENGAGEMENT_2);
    Assertions.assertEquals(
        List.of(ENGAGEMENT_1, ENGAGEMENT_2),
        dbHandler.getEngagements(STAFF_ID)
    );
  }

  @Test
  void removeEngagement() {
    dbHandler.addStaff(STAFF_MEMBER);
    dbHandler.addEngagement(ENGAGEMENT_1);
    dbHandler.removeEngagement(ENGAGEMENT_ID);
    Assertions.assertEquals(
        List.of(),
        dbHandler.getEngagements(STAFF_ID)
    );
  }

  @Test
  void addPreferredDates() {
    dbHandler.addStaff(STAFF_MEMBER);
    dbHandler.addPreferredDates(PREFERRED_DATES);
    Assertions.assertEquals(
        Optional.of(PREFERRED_DATES),
        dbHandler.getPreferredDates(STAFF_ID)
    );
  }

  @Test
  void updatePreferredDates() {
    dbHandler.addStaff(STAFF_MEMBER);
    dbHandler.addPreferredDates(PREFERRED_DATES);
    dbHandler.updatePreferredDates(STAFF_ID, new HashMap<>() {
          {
            put("monday", true);
          }
        }
    );
    Assertions.assertEquals(
        Optional.of(PREFERRED_DATES_BUILDER.monday(true).build()),
        dbHandler.getPreferredDates(STAFF_ID)
    );
  }

  @Test
  void removePreferredDates() {
    dbHandler.addStaff(STAFF_MEMBER);
    dbHandler.addPreferredDates(PREFERRED_DATES);
    dbHandler.removePreferredDates(STAFF_ID);
    Assertions.assertEquals(
        Optional.empty(),
        dbHandler.getPreferredDates(STAFF_ID)
    );
  }
}
