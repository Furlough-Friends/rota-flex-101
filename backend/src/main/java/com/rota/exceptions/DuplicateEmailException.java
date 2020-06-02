package com.rota.exceptions;

public class DuplicateEmailException extends RuntimeException {
  private static final long serialVersionUID = -5475277246281238638L;

  public DuplicateEmailException(String email) {
    super("An email address " + email + " already exists in the database.");
  }
}
