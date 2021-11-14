package io.codex.service.exception;

import io.codex.api.car.exception.ExceptionResponse;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
@Slf4j
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {


    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(final Exception exception, final WebRequest request) {
        return buildExceptionResponse(exception, request, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(HttpClientErrorException.BadRequest.class)
    public final ResponseEntity<Object> handleBadRequestException(final HttpClientErrorException.BadRequest exception, final WebRequest request){
        return buildExceptionResponse(exception, request, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidInputException.class)
    public final ResponseEntity<Object> handleInvalidInputException(final InvalidInputException exception, final WebRequest request){
        return buildExceptionResponse(exception, request, HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity<Object> buildExceptionResponse(
        final Exception exception, WebRequest request, HttpStatus httpStatus) {

        return buildExceptionResponse(exception, request, httpStatus, Optional.empty());
    }

    private ResponseEntity<Object> buildExceptionResponse(
        final Throwable exception, WebRequest request, HttpStatus httpStatus, Optional<List<String>> details) {

        final String errorMessage = Optional.ofNullable(exception.getMessage())
            .orElse("Unexpected error");

        return new ResponseEntity<>(
            ExceptionResponse.builder().with(builder -> {
                builder.status = httpStatus.value();
                builder.errorMessage = errorMessage;
                details.ifPresent(
                    detailsList -> builder.details = detailsList);
                builder.callerURL = request.getDescription(false);
            }).build(), httpStatus);
    }
}
