package io.codex.model;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@ComponentScan(basePackages = "io.codex.model")
@EntityScan(basePackages = "io.codex.model")
@Configuration
@EnableAutoConfiguration
public class ModelConfig {
}
