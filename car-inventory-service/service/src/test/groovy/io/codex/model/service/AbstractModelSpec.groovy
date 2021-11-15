package io.codex.model.service

import io.codex.service.ServiceApplication
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.PropertySource
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.ContextConfiguration
import spock.lang.Specification

@ContextConfiguration
@SpringBootTest(classes= [ServiceApplication.class])
@PropertySource(["classpath:application-test.yml"])
@ActiveProfiles("test")
abstract class AbstractModelSpec extends Specification {
}
