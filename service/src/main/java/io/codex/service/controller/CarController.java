package io.codex.service.controller;

import io.codex.api.car.resource.CarResource;
import io.codex.model.service.CarModelService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CarController implements CarResource {

    private final CarModelService carModelService;

    public CarController(CarModelService carModelService) {
        this.carModelService = carModelService;
    }
}
