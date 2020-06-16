package com.rota.exceptions;

import javax.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerExceptionHandler {

  /**
   * Handles StaffNotFoundException.
   *
   * @param e                  The exception.
   * @param httpServletRequest the request that caused the exception.
   * @return An {@link ErrorResponse} in response.
   */
  @ExceptionHandler(EngagementNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleStaffNotFoundException(
      EngagementNotFoundException e,
      HttpServletRequest httpServletRequest
  ) {
    return new ResponseEntity<>(
        new ErrorResponse(
            HttpStatus.BAD_REQUEST,
            e.getMessage(),
            httpServletRequest.getServletPath()),
        HttpStatus.BAD_REQUEST);
  }

  /**
   * Handles DuplicateEmailException.
   *
   * @param e The exception.
   * @param httpServletRequest the request that caused the exception.
   * @return An {@link ErrorResponse} in response.
   */
  @ExceptionHandler(DuplicateEmailException.class)
  public ResponseEntity<ErrorResponse> handleDuplicateEmailException(
      DuplicateEmailException e,
      HttpServletRequest httpServletRequest
  ) {
    return new ResponseEntity<>(
        new ErrorResponse(
            HttpStatus.BAD_REQUEST,
            e.getMessage(),
            httpServletRequest.getServletPath()),
        HttpStatus.BAD_REQUEST);
  }

}
