package com.rota.api.dto;

import com.rota.database.orm.engagement.Engagement;
import com.rota.database.orm.engagement.EngagementType;
import io.swagger.annotations.ApiModelProperty;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Value;

@Value
@AllArgsConstructor
public class EngagementDto {
  @ApiModelProperty(value = "Engagement ID")
  int id;

  @ApiModelProperty(value = "Staff ID")
  int staffId;

  @ApiModelProperty(value = "Starting time of an engagement")
  Instant start;

  @ApiModelProperty(value = "End time of an engagement")
  Instant end;

  @ApiModelProperty(value = "Type of engagement, e.g. SHIFT, HOLIDAY etc.")
  EngagementType type;

  /**
   * Converts the engagement database class into engagement DTO.
   * @param engagement Engagement from the database.
   * @return DTO object corresponding to the engagement.
   */
  public static EngagementDto fromEngagement(Engagement engagement) {
    return new EngagementDto(
        engagement.getId(),
        engagement.getStaff().getId(),
        engagement.getStart(),
        engagement.getEnd(),
        engagement.getType()
    );
  }
}
