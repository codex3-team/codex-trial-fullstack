package io.codex.model.service;

import io.codex.model.entity.Car;
import java.util.Map;
import java.util.UUID;

public interface CarService {

    Car saveCar(Car car);
    Map<String, Object> findAll(Integer page, Integer size, String... sort);
    void delete(UUID id);
}
