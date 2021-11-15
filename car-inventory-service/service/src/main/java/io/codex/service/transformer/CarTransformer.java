package io.codex.service.transformer;

import io.codex.api.car.request.CarRequest;
import io.codex.api.car.response.CarResponse;
import io.codex.model.entity.Car;
import io.codex.service.exception.InvalidInputException;

public class CarTransformer {

    private CarTransformer() {
    }

    public static CarResponse toResponse(Car car){
        return CarResponse.builder().with(builder -> {
            builder.id = car.getId();
            builder.make = car.getMake();
            builder.model = car.getModel();
            builder.year = car.getYear();
        }).build();
    }

    public static Car toEntity(CarRequest carRequest){

        if(!carRequest.getYear().matches("^\\d{4}$")){
            throw new InvalidInputException("Invalid year. It must contain 4 digits.");
        }

        return Car.builder().with(builder -> {
            builder.make = carRequest.getMake();
            builder.model = carRequest.getModel();
            builder.year = carRequest.getYear();
        }).build();
    }
}
