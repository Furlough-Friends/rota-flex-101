package com.rota.exceptions;

public class AuthenticationHttpException extends RuntimeException {
  public AuthenticationHttpException(Exception e) {
    super(e);
  }
}
