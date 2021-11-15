package io.codex.model.service

import io.codex.model.entity.Car
import org.springframework.beans.factory.annotation.Autowired
import spock.lang.Unroll

class CarServiceSpec extends AbstractModelSpec {

    @Autowired
    CarService carService

    def "add new car - should return added car"(){

        given:
        def car = Car.builder().with({
            make = 'Fisker'
            model = 'Ocean'
            year = '2022'
            build()
        })

        when:
        def createdCar = carService.saveCar(car)

        then:
        createdCar.with {
            assert id
            assert make == 'Fisker'
            assert model == 'Ocean'
            assert year == '2022'
        }

        and:
        carService.delete(createdCar.id)
    }

    @Unroll
    def "find all cars according to paging criteria - should return a page of cars that matches paging criteria"(){

        when:
        def pageOfCars = carService.findAll(page, size, sort)

        then:
        pageOfCars['content'].size() == content
        pageOfCars['currentPage'] == currentPage
        pageOfCars['totalPages'] == totalPages
        pageOfCars['totalOfItems'] == totalOfItems

        where:
        page | size |  sort  || content || currentPage || totalPages || totalOfItems
         1   |  10  | 'make' ||    10   ||     1       ||    2298    ||    22974
         2   |  5   | 'make' ||    5    ||     2       ||    4595    ||    22974
    }
}