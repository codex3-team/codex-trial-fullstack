package io.codex.api.car.response;

import java.util.UUID;
import java.util.function.Consumer;

public class CarResponse {

    private UUID id;
    private String make;
    private String model;
    private String year;

    protected CarResponse() {
    }

    public CarResponse(Builder builder) {
        this.id = builder.id;
        this.make = builder.make;
        this.model = builder.model;
        this.year = builder.year;
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

    public static Builder builder(){
        return new Builder();
    }

    public static final class Builder{

        public UUID id;
        public String make;
        public String model;
        public String year;

        public Builder with(Consumer<Builder> consumer){
            consumer.accept(this);
            return this;
        }

        public CarResponse build(){
            return new CarResponse(this);
        }
    }
}
