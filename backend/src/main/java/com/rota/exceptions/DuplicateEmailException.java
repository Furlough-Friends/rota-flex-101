package com.rota.exceptions;

public class DuplicateEmailException extends RuntimeException {
  public DuplicateEmailException(String email) {
    super("An email address " + email + " already exists in the database.");
  }
}
