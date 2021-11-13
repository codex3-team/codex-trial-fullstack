package io.codex.model.entity;

import java.io.Serializable;
import java.util.UUID;
import java.util.function.Consumer;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table
public class Car implements Serializable {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(nullable = false, updatable = false)
    private UUID uuid;

    @Column(nullable = false)
    private String make;

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private String year;

    protected Car() {
    }

    public Car(Builder builder) {
        this.uuid = builder.uuid;
        this.make = builder.make;
        this.model = builder.model;
        this.year = builder.year;
    }

    public UUID getUuid() {
        return uuid;
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

        public UUID uuid;
        public String make;
        public String model;
        public String year;

        public Builder with(Consumer<Builder> consumer){
            consumer.accept(this);
            return this;
        }

        public Car build(){
            return new Car(this);
        }
    }
}
