package io.codex.model;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@ComponentScan(basePackages = "io.codex.model")
@EnableJpaRepositories(basePackages = "io.codex.model",
    includeFilters = @ComponentScan.Filter(type = FilterType.REGEX, pattern=".*[Repository]"))
@EntityScan(basePackages = "io.codex.model")
@Configuration
public class ModelDBConfig {

}
