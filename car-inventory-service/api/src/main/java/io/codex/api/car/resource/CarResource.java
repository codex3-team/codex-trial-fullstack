package io.codex.api.car.resource;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import io.codex.api.car.request.CarRequest;
import io.codex.api.car.response.CarResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Map;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

@Tag(
    name = "Endpoint to add and query cars"
)
@RequestMapping(
    value = "/v1/cars"
)
public interface CarResource {

    @Operation(
        summary = "Add new car"
    )
    @ApiResponses(
        value = {
            @ApiResponse(
                responseCode = "200",
                description = "The saved car",
                content = {
                    @Content(
                        mediaType = APPLICATION_JSON_VALUE,
                        schema = @Schema(
                            implementation = CarResponse.class
                        )
                    )
                }
            ),
        }
    )
    @PostMapping(
        consumes = APPLICATION_JSON_VALUE,
        produces = APPLICATION_JSON_VALUE
    )
    @ResponseStatus(HttpStatus.CREATED)
    CarResponse addCar(@Valid @RequestBody final CarRequest orderRequest);


    @Operation(
        summary = "Find all cars that matches paging criteria"
    )
    @ApiResponses(
        value = {
            @ApiResponse(
                responseCode = "200",
                description = "A paged sorted page of cars",
                content = {
                    @Content(
                        mediaType = APPLICATION_JSON_VALUE,
                        array = @ArraySchema(
                            schema = @Schema(
                                implementation = Map.class
                            )
                        )
                    )
                }
            )
        }
    )
    @GetMapping(produces = APPLICATION_JSON_VALUE)
    Map<String,Object> findCars(
        @RequestParam(name = "page") Integer page,
        @RequestParam(name = "size") Integer size,
        @RequestParam(name = "sort") String sort
    );

}
