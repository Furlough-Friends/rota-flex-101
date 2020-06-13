package com.rota.database.orm.staff;

import java.time.LocalDate;
import java.util.Optional;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

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

  @Column(unique = true)
  private String email;
  
  @PrePersist
  private void onPrePersist() {
    this.setJobTitle(jobTitle.toLowerCase());
  }

  @PreUpdate
  private void onPreUpdate() {
    this.setJobTitle(jobTitle.toLowerCase());
  }

  public Optional<String> getEmail() {
    return Optional.ofNullable(email);
  }
}