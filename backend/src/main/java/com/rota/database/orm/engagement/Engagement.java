package com.rota.database.orm.engagement;

import com.rota.database.orm.staff.Staff;
import java.time.Instant;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Engagement {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private Instant start;
  private Instant end;

  @Enumerated(value = EnumType.STRING)
  private EngagementType type;

  private double hoursWorked;

  @ManyToOne(fetch = FetchType.LAZY)
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Staff staff;
}
