package com.rota.exceptions;

public class StaffNotFoundException extends RuntimeException {
  public StaffNotFoundException(int id) {
    super("Unable to find staff member with ID: " + id);
  }
  public StaffNotFoundException() {
    super();
  }
}
