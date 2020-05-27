package com.rota.api;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import com.rota.api.dto.EngagementDto;
import com.rota.database.orm.engagement.Engagement;
import com.rota.database.orm.engagement.EngagementRepository;
import com.rota.database.orm.engagement.EngagementType;
import com.rota.database.orm.staff.Staff;

import java.time.Instant;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class EngagementTests {

  @Mock
  private EngagementRepository engagementRepository;

  @InjectMocks
  private StaffService staffService;
  
  @BeforeEach
  public void setUp() {
    staffService = new StaffService();
    MockitoAnnotations.initMocks(this);
  }

  private final Staff dummyStaff = Staff.builder()
      .id(1).build();
  private final Instant engagementStart = Instant.parse("2020-05-19T23:00:00Z");
  private final Instant engagementEnd = Instant.parse("2020-05-20T01:00:00Z");
  private final List<Engagement> exampleEngagements =
      List.of(
          new Engagement(
              1,
              engagementStart, 
              engagementEnd,
              EngagementType.SHIFT,
              0,
              dummyStaff
          )
      );
  private final Instant queryTime = Instant.parse("2020-05-20T00:00:00Z");
  
  @Test
  public void truncateEngagementStart() {
    when(engagementRepository.findAll())
      .thenReturn(exampleEngagements);

    final List<EngagementDto> expectedResult = List.of(
        new EngagementDto(
            1,
            queryTime, 
            engagementEnd, 
            EngagementType.SHIFT)
    );

    assertEquals(
        expectedResult,
        staffService.getAllEngagementsBetween(queryTime, null)
    );
  }
  
  @Test
  public void truncateEngagementEnd() {
    when(engagementRepository.findAll())
      .thenReturn(exampleEngagements);

    final List<EngagementDto> expectedResult = List.of(
        new EngagementDto(
            1,
            engagementStart, 
            queryTime, 
            EngagementType.SHIFT)
    );

    assertEquals(
        expectedResult,
        staffService.getAllEngagementsBetween(null, queryTime)
    );
  }

  @Test
  public void engagementOutsideOfQuery() {
    when(engagementRepository.findAll())
      .thenReturn(exampleEngagements);

    assertEquals(
        List.of(),
        staffService.getAllEngagementsBetween(null, Instant.parse("2020-05-19T22:59:00Z"))
    );
  }

  @Test
  public void startDateAfterEndDate() { // Should return an empty list
    when(engagementRepository.findAll())
      .thenReturn(exampleEngagements);

    assertEquals(
        List.of(),
        staffService.getAllEngagementsBetween(engagementEnd, engagementStart)
    );
  }
}