package com.ems.managementsystem;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class ManagementsystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(ManagementsystemApplication.class, args);
	}
	  @EventListener(ApplicationReadyEvent.class)
  public void onReady() {
    System.out.println("ems API running"
        + (SERVER_PORT != 0 ? (" on PORT " + SERVER_PORT) : "") + " 🚀");
  }

  private static int SERVER_PORT;

  @Value("${server.port}")
  public void setServerPort(int port) {
    SERVER_PORT = port;
  }

}
