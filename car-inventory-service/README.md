# Codex Challenge

## Tech stack

* Java 11
* Docker
* Docker compose
* Gradle
* PostgresSQL
* Groovy
* Spock framework
* Spring Boot
* Flyway database migration
* Spring doc open API (Swagger)
* Rest Assured
* TestContainer

## Module and package structures of the project
```bash
root car-inventory-service/
├── api
│   └── src
│       ├── main
│       │    ├── java
│       │    │     ├── io.codex.api
│       │    │     │        │
│       │    │     │        ├── request
│       │    │     │        ├── resource
│       │    │     │        ├── response
│   └── build.gradle
├── model
│   └── src
│       ├── main
│       │    ├── java
│       │    │     ├── io.codex.model
│       │    │     │        ├── entity
│       │    │     │        ├── repository
│       │    │     │        ├── service
│       │    │     │        ├── ModelConfig
│   └── build.gradle
├── service
│   └── src
│       ├── main
│       │    ├── java
│       │    │     ├── io.codex.service
│       │    │     │        ├── controller
│       │    │     │        ├── exception
│       │    │     │        ├── transformer
│       │    │     │        ├── ServiceApplication.java
│       │    ├── resources
│       │    │     ├── db
│       │    │     │   │── migration
│       │    │     │   │      ├── V1.0.1__initial_script.sql
│       │    │     ├── application.yml
│       └── test
│       │    ├── groovy
│       │    │      ├── io.codex.model
|       │    │      ├── io.codex.service
│   └── build.gradle
├── build.gradle
```

## How the modules communicate

```bash
Module dependencies

           |----------------|
           |      api       |
           |----------------|             
                  ^                             
                 /                              
           depends on                          
               /          
              /           
             /                      
    |----------------|                       |----------------|                               
    |     service    |  ---- depends on -->  |     mode       |    
    |----------------|                       |----------------|                        
                
```

## Instruction to spinning up the project locally

You can find in this project the following Dockerfile and docker-compose descriptors

* `Dockerfile` 
* `Dockerfile.local`

* `docker-compose-postgresql.yml` Create a Postgresql instance.
* `docker-compose-service.yml` Create the instance of the car-inventory-service including remote debugging
* `docker-compose-service-local.yml` Create the instance of the car-inventory-service including remote debugging **

### How to run this project

#### Approach 1 - For impatient developers :)

Step 1 - To execute the build Gradle task, type the following command at a terminal prompt in the project base directory.

`./gradlew clean build` or `gradle clean build`

The command above will perform the following workflow steps:

* compiles Java classes to the /build directory
* copies all resources to the /build directory
* executes the unit test suites
* prepares an executable JAR file in the service/build/libs directory

Step 2 - Running the docker-compose

`docker-compose -f docker-compose-postgresql.yml docker-compose-service-local.yml up --build`

The command above will execute the Dockerfile.local that just will copy executable JAR file in the service/build/libs directory into a docker image which executes JAR file.

That saves a lot of time because we don't need to wait for the whole Gradle tasks to run into the Docker. :)

#### Approach 2 - For continuous integration servers

Ideal for use on continuous integration servers such as Jenkins and others, but if you want to run the whole steps locally, just execute the command below that will use the Dockerfile.

`docker-compose -f docker-compose-postgresql.yml docker-compose-service.yml up --build`

## Accessing the local environment

### PgAdmin

How to create a new server to have access to database cluster.

Step 1 - Click the right button on the Server, Create New Server

Step 2 - In General tap inform the connection name

Step 3 - In Connection tap inform we are gonna set the database connection.
* Host name/ address. Please use the docker container service name `postgresql-service`
* Username`alesander`
* Password `CodexChallenge`

http://localhost:16543

### Swagger UI Tools

You can use the Swagger to perform the API calls and the API documentation

http://localhost:8008/codex/api/swagger-ui.html

Of course, you can curl API calls by using the following commands:

Add new car
```
curl -X 'POST' \
  'http://localhost:8008/codex/api/v1/cars' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "make": "Fiat",
  "model": "Uno",
  "year": "1990"
}'
```

Find all cars that matches paging criteria
```
curl -X 'GET' \
'http://localhost:8008/codex/api/v1/cars?page=1&size=10&sort=make' \
-H 'accept: application/json'
```

### API docs

http://localhost:8008/codex/api/api-docs








