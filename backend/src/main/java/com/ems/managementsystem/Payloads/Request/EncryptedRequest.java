package com.ems.managementsystem.Payloads.Request;

import org.bisag.offtime.utils.Json;

import jakarta.validation.constraints.NotBlank;

public class EncryptedRequest {
  @NotBlank(message = "Invalid request data")
  private String data;

  public <T> T bodyAs(Class<T> clazz) throws Exception {
    return Json.deserialize(clazz, data);
  }

  public String getData() {
    return data;
  }

  public void setData(String data) {
    this.data = data;
  }

  public EncryptedRequest() {
  }

}
