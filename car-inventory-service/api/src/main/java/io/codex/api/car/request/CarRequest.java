package io.codex.api.car.request;

public class CarRequest {

    private String make;
    private String model;
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
