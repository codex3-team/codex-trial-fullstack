package io.codex.api.car.request;

import javax.validation.constraints.NotNull;

public class CarRequest {

    @NotNull(message = "Make is required")
    private String make;

    @NotNull(message = "Model is required")
    private String model;

    @NotNull(message = "Year is required")
    private String year;

    protected CarRequest() {
    }

    public CarRequest(String make, String model, String year) {
        this.make = make;
        this.model = model;
        this.year = year;
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
