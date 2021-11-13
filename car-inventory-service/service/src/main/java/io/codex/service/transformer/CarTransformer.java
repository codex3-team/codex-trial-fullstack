package io.codex.service.transformer;

import io.codex.api.car.request.CarRequest;
import io.codex.api.car.response.CarResponse;
import io.codex.model.entity.Car;

public class CarTransformer {

    public static CarResponse toResponse(Car car){
        return new CarResponse(car.getId(), car.getMake(), car.getModel(), car.getYear());
    }

    public static Car toEntity(CarRequest carRequest){
        return Car.builder().with(builder -> {
            builder.make = carRequest.getMake();
            builder.model = carRequest.getModel();
            builder.year = carRequest.getYear();
        }).build();
    }

}
