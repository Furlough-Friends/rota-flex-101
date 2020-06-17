package com.rota.exceptions;

public class EngagementNotFoundException extends RuntimeException {
  static final long serialVersionUID = 1L;

  public EngagementNotFoundException(int id) {
    super("Unable to find engagement with ID: " + id);
  }

  public EngagementNotFoundException() {
    super();
  }
}
