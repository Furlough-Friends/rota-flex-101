package com.rota.api.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HelloWorld {
  @ApiModelProperty(value = "Hello world message ID.")
  private final long id;
  @ApiModelProperty(value = "Hello world response body.")
  private final String message;
}