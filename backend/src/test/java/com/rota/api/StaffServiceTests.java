package com.rota.api;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.rota.api.dto.StaffDto;
import com.rota.database.orm.staff.Role;
import com.rota.database.orm.staff.Staff;
import com.rota.database.orm.staff.StaffRepository;
import com.rota.exceptions.StaffNotFoundException;
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

  private final StaffDto validStaffDto = new StaffDto("Initial", "Test", Role.USER,
      null, 0, 0, "", "", false);

  @Test
  public void updateStaffInvalidUserId() {
    final int invalidUserId = 12301;
    when(staffRepository.findById(invalidUserId))
        .thenThrow(new StaffNotFoundException(invalidUserId));

    assertThrows(
        StaffNotFoundException.class, () -> staffService.updateStaff(invalidUserId, validStaffDto));
  }

  @Test
  public void updateStaff() {
    Staff initialStaffObject = new Staff();
    StaffDto updatedStaffDto = new StaffDto("Updated", "User", Role.USER,
        null, 0, 0, "", "", false);
    Staff updatedStaffObject = updatedStaffDto.toStaff();

    when(staffRepository.findById(1)).thenReturn(Optional.of(initialStaffObject));
    when(staffRepository.save(any(Staff.class))).thenReturn(updatedStaffObject);

    Staff actualResult = staffService.updateStaff(1, updatedStaffDto);

    assertThat(actualResult, is(equalTo(updatedStaffObject)));
  }
}
