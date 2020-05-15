package com.rota.database.orm.staff;

import java.time.LocalDate;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Staff {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String firstName;

  private String surname;

  private boolean inactive;

  private LocalDate startDate;

  private double contractedHours;

  private double hourlyRate;

  @Enumerated(EnumType.STRING)
  private Role role;

  private String preferredDates;

  private String jobTitle;

  @PrePersist
  private void onPrePersist() {
    this.setJobTitle(jobTitle.toLowerCase());
  }

  @PreUpdate
  private void onPreUpdate() {
    this.setJobTitle(jobTitle.toLowerCase());
  }
}