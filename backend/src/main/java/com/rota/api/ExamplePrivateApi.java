package com.rota.api;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api")
//@CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "true")
public class ExamplePrivateApi {

  @GetMapping(value = "/public")
  public String publicEndpoint() {
    return "hello";
  }

  @GetMapping(value = "/private")
  public String privateEndpoint() {
    return "hello, this is private";
  }
}
