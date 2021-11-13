package io.codex.api.car.response;

import java.util.UUID;

public class CarResponse {

    private UUID id;
    private String make;
    private String model;
    private String year;

    protected CarResponse() {
    }

    public CarResponse(UUID id, String make, String model, String year) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.year = year;
    }

    public UUID getId() {
        return id;
    }

    public String getMake() {
        return make;
    }

    public String getModel() {
        return model;
    }

    public String getYear() {
        return year;
    }
}
