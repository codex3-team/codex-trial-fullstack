package io.codex.service.controller

import io.codex.api.car.response.CarResponse
import io.codex.model.service.CarService
import org.springframework.beans.factory.annotation.Autowired


class CarControllerSpec extends AbstractControllerSpec {

    public static final CARS_RESOURCE = '/v1/cars'
    public static final FIND_CARS_ENDPOINT = '/v1/cars?page={page}&size={size}&sort={sort}'

    @Autowired
    CarService carService

    def "add new car - should return added car"(){

        given:
        def requestBody = readFile("input", "newCar")

        when:
        def response = createRequest()
                .when()
                .body(requestBody)
                .post("${CONTEXT_PATH}${CARS_RESOURCE}")
                .thenReturn()

        then:
        response.statusCode() == 201

        and:
        print("Response:")
        response.prettyPrint()

        and:
        def content = response.body().as(CarResponse.class)
        content.with {
            assert id
            assert make == 'Alfa Romeo'
            assert model == 'Giulia Sprint GTA'
            assert year == '1960'
        }

        and:
        carService.delete(content.id)
    }

    def "find cars - should return all cars that match paging criteria"(){

        given:
        def expectedResponse = readFile("output", "findCarsMatchPagingCriteriaPage1Size10AndSortByMake")

        when:
        def response = createRequest()
                .when()
                .pathParam("page", 1)
                .pathParam("size", 10)
                .pathParam("sort", 'make')
                .get("${CONTEXT_PATH}${FIND_CARS_ENDPOINT}")
                .thenReturn()

        then:
        response.statusCode() == 200

        and:
        print("Response:")
        response.prettyPrint()

        and:
        def responseContent = response.body().as(Map.class)
        def expectedResult = mapper.readValue(expectedResponse, Map.class)

        and:
        assertResponse(responseContent, expectedResult)
    }

    static def assertResponse(Map<String, Object> response, Map<String, Object> expectedResult){

        assert response['currentPage'] == 1
        assert response['totalPages'] == 2298
        assert response['totalOfItems'] == 22974

        response['content'].eachWithIndex { actual, index ->

            def content = expectedResult['content']
            def expected = content[index]

            assert actual.id == expected.id
            assert actual.make == expected.make
            assert actual.model == expected.model
            assert actual.year == expected.year
        }
    }
}