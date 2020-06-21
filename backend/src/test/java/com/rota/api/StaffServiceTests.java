package com.rota.api;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import com.rota.api.dto.StaffDto;
import com.rota.database.orm.staff.Role;
import com.rota.database.orm.staff.StaffRepository;
import com.rota.exceptions.EngagementNotFoundException;

import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class StaffServiceTests {

  @Mock
  private StaffRepository staffRepository;

  @InjectMocks
  private StaffService staffService;

  @BeforeEach
  public void setUp() {
    staffService = new StaffService();
    MockitoAnnotations.initMocks(this);
  }

  private final StaffDto invalidStaffDto =
      new StaffDto(12301, "Initial", "Test", Role.USER, null, 0,
          0, "", "", false, "test@test.com");

  @Test
  public void updateStaffInvalidUserId() {
    final int invalidUserId = 12301;
    when(staffRepository.findById(invalidUserId))
        .thenThrow(new EngagementNotFoundException(invalidUserId));

    assertThrows(
        EngagementNotFoundException.class, () -> staffService.updateStaff(invalidStaffDto));
  }

  @Test
  public void updateStaff() {
    StaffDto updatedStaffDto =
        new StaffDto(1, "Updated", "User", Role.USER, null, 0,
            0, "", "", false, "test@test.com");

    when(staffRepository.findById(1)).thenReturn(Optional.of(updatedStaffDto.toStaff()));
    when(staffRepository.findAll()).thenReturn(List.of(updatedStaffDto.toStaff()));

    StaffDto actualResult = staffService.updateStaff(updatedStaffDto).get(0);

    assertThat(actualResult, is(equalTo(updatedStaffDto)));
  }
}
