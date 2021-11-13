package io.codex.service.controller;

import io.codex.api.car.resource.CarResource;
import io.codex.model.service.CarService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CarController implements CarResource {

    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }
}
