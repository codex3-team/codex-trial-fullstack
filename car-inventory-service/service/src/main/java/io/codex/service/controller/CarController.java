package io.codex.service.controller;

import io.codex.api.car.request.CarRequest;
import io.codex.api.car.resource.CarResource;
import io.codex.api.car.response.CarResponse;
import io.codex.model.service.CarService;
import io.codex.service.exception.InvalidInputException;
import io.codex.service.transformer.CarTransformer;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
public class CarController implements CarResource {

    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @Override
    public CarResponse addCar(CarRequest carRequest) {
        final var savedCar = carService.saveCar(CarTransformer.toEntity(carRequest));
        return CarTransformer.toResponse(savedCar);
    }

    @Override
    public Map<String, Object> findCars(Integer page, Integer size, String sort) {
        validate(sort);
        return carService.findAll(page, size, sort);
    }

    protected void validate(String sort){
        List<String> fields = Arrays.asList("id", "make", "model", "year");
        if(!fields.contains(sort)){
            throw new InvalidInputException(String.format("%s is not a valid sort field. Valid fields are: id, make, model and year", sort));
        }
    }
}
