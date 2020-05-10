package com.rota.exceptions;

import java.time.Instant;
import lombok.Value;
import org.springframework.http.HttpStatus;

@Value
public class ErrorResponse {
  int status;
  String error;
  String message;
  String path;
  Instant timestamp;

  /**
   * Error response constructor, used by ControllerExceptionHandler.
   *
   * @param httpStatus The status code to send.
   * @param message    A useful error message.
   * @param path       The path where the exception happened.
   */
  public ErrorResponse(HttpStatus httpStatus, String message, String path) {
    this.status = httpStatus.value();
    this.error = httpStatus.getReasonPhrase();
    this.timestamp = Instant.now();
    this.message = message;
    this.path = path;
  }
}

