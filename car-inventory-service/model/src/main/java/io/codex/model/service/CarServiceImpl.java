package io.codex.model.service;

import io.codex.model.entity.Car;
import io.codex.model.repository.CarRepository;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CarServiceImpl implements CarService {

    private final CarRepository carRepository;

    public CarServiceImpl(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @Override
    public Car saveCar(Car car) {
        return carRepository.save(car);
    }

    @Override
    public Map<String, Object> findAll(Integer page, Integer size, String... sort) {

        final var pageRequest = PageRequest.of(page, size, Sort.by(sort));
        final var currentPageOfCars = carRepository.findAll(pageRequest);

        if(!currentPageOfCars.hasContent()){
            return Map.of();
        }

        final var pageOfCars = new LinkedHashMap<String, Object>();
        pageOfCars.put("content", currentPageOfCars.getContent());
        pageOfCars.put("currentPage", currentPageOfCars.getNumber());
        pageOfCars.put("totalPages", currentPageOfCars.getTotalPages());
        pageOfCars.put("totalOfItems", currentPageOfCars.getTotalElements());

        return pageOfCars;
    }

    @Override
    public void delete(UUID id) {
        if(carRepository.existsById(id)){
            carRepository.deleteById(id);
        }
    }

}
