package io.codex.modeldb;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@ComponentScan(basePackages = "io.codex.modeldb")
@EnableJpaRepositories(basePackages = "io.codex.modeldb",
    includeFilters = @ComponentScan.Filter(type = FilterType.REGEX, pattern=".*[Repository]"))
@Configuration
public class ModelDBConfig {

}
