package com.rota.api;

import com.rota.api.dto.HelloWorld;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api")
@CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "true")
public class ExamplePrivateApi {

  @GetMapping(value = "/public")
  public HelloWorld publicEndpoint() {
    return new HelloWorld(1, "hello");
  }

  @GetMapping(value = "/private")
  public HelloWorld privateEndpoint() {
    return new HelloWorld(1, "hello, this is private");
  }
}
