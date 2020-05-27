package com.rota.exceptions;

public class StaffNotFoundException extends RuntimeException {
  static final long serialVersionUID = 1L;

  public StaffNotFoundException(int id) {
    super("Unable to find staff member with ID: " + id);
  }

  public StaffNotFoundException() {
    super();
  }
}
