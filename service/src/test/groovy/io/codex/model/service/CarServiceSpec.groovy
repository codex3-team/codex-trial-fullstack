package io.codex.model.service

import org.springframework.beans.factory.annotation.Autowired


class CarServiceImplSpec extends AbstractModelSpec {

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
        def createdCar = cardModelService.saveCar(car)

        then:
        createdCar.with {
            assert id
            assert make == 'Fisker'
            assert model == 'Ocean'
            assert year == '2022'
        }
    }
}