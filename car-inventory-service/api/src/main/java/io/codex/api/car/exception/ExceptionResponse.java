package io.codex.api.car.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.util.List;
import java.util.function.Consumer;

public class ExceptionResponse {

  private int status;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
  private LocalDateTime timestamp;
  private String errorMessage;
  private List<String> details;
  private String callerURL;

  protected ExceptionResponse(){
  }

  public String getErrorMessage() {
    return errorMessage;
  }

  public int getStatus() {
    return status;
  }

  public LocalDateTime getTimestamp() {
    return timestamp;
  }

  public List<String> getDetails() {
    return details;
  }

  public String getCallerURL() {
    return callerURL;
  }

  private ExceptionResponse(Builder builder){
    this.status = builder.status;
    this.timestamp = LocalDateTime.now();
    this.errorMessage = builder.errorMessage;
    this.details = builder.details;
    this.callerURL = builder.callerURL;
  }

  public static Builder builder() {
    return new Builder();
  }

  public static final class Builder {
    public int status;
    public String errorMessage;
    public List<String> details;
    public String callerURL;

    public Builder with(Consumer<Builder> consumer) {
      consumer.accept(this);
      return this;
    }

    public ExceptionResponse build() {
      return new ExceptionResponse(this);
    }
  }
}
