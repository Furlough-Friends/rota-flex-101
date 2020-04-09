package com.rota.api;

import com.rota.api.dto.HelloWorld;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
  private AtomicLong id = new AtomicLong();
  private String template = "Hello %s!";

  /**
   * /hello will return "Hello World!".
   * /hello?message=foo will return "Hello foo!".
   * @param message Message to print
   * @return HelloWorld response DTO
   */
  @GetMapping("/hello")
  public HelloWorld helloEndpoint(
      @RequestParam(value = "message",
          defaultValue = "World")
      String message
  ) {
    return new HelloWorld(
        id.incrementAndGet(),
        String.format(template, message)
    );
  }

  /**
   * /hello/{message} endpoint, will return "Hello {message}!".
   * @param message message to send
   * @return HelloWorld DTO
   */
  @GetMapping("/hello/{message}")
  public HelloWorld helloVariableEndpoint(
      @PathVariable
      String message
  ) {
    return new HelloWorld(
        id.incrementAndGet(),
        String.format(template, message)
    );
  }
}
