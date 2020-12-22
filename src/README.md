# cars-shop-API

API for interacting with cars shop catalogue.

### How to run:

1. Install Docker
2. Install docker-compose
3. Clone repo
4. Run docker-compose:
```
docker-compose up -d
```
5. Run the following commands once:
```
docker-compose exec web python manage.py migrate
docker-compose exec web python manage.py loaddata dump.json
```

Application will be available at http://127.0.0.1:8000.

Run tests by using this command:
```
docker-compose exec web pytest
```

### Available endpoints:

    GET http://127.0.0.1:8000/api/cars/
    Receiving a list of results with 100 cars per page by default.

    POST http://127.0.0.1:8000/api/cars/
    Post a new car.


There is a file `postman_collection.json` containing prepared Postman collection.
