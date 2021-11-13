package com.bitso.challenge.service.controller

import com.bitso.challenge.service.ServiceApplication
import com.fasterxml.jackson.databind.ObjectMapper
import io.restassured.http.ContentType
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.context.annotation.PropertySource
import org.springframework.test.context.ActiveProfiles
import spock.lang.Specification

import static io.restassured.RestAssured.given

@SpringBootTest(
    classes= [ServiceApplication.class],
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@PropertySource(["classpath:application-test.yml"])
@ActiveProfiles("test")
abstract class AbstractControllerSpec extends Specification{

    public static final CONTEXT_PATH = '/bitso/challenge/api'

    @LocalServerPort
    int port

    @Autowired
    public ObjectMapper mapper

    def createRequest() {
        given()
            .log()
            .all()
            .port(port)
            .accept(ContentType.JSON)
            .contentType(ContentType.JSON)
            .urlEncodingEnabled(false)
    }

    /**
     * This method reads the expected input and output values for the endpoints
     * @param directory (input/output)
     * @param fileName
     * @return JSON as a String
     */
    static def readFile(String directory, String fileName){
        return new File("src/test/resources/${directory}/${fileName}.json").text
    }

    /**
     * This method reads the generated token for a specific client
     * @param tokenName
     * @return Bearer token
     */
    static def readToken(String tokenName){
        return new File("src/test/resources/tokens/${tokenName}.txt").text
    }
}