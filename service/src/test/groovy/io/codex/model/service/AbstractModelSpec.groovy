package com.bitso.challenge.model.db.service

import com.bitso.challenge.service.ServiceApplication
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.PropertySource
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.ContextConfiguration
import spock.lang.Specification

@ContextConfiguration
@SpringBootTest(classes= [ServiceApplication.class])
@PropertySource(["classpath:application-test.yml"])
@ActiveProfiles("test")
abstract class AbstractServiceSpec extends Specification {
}
