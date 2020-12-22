import json
import pytest
import requests
import uuid

from .constants import API_ROOT


test_post_data = {
    "make": "Test manufacturer",
    "model": "Test model",
    "year": "1999"
}


# Create your tests here.
def test_content_type_equals_json():
    response = requests.get(API_ROOT)
    assert response.headers["Content-Type"] == "application/json"


def test_status_code_equals_200():
    response = requests.get(API_ROOT)
    assert response.status_code == 200


def test_previous_link_missing():
    response = requests.get(API_ROOT)
    response_body = response.json()
    assert not bool(response_body['previous'])


def test_previous_link_exists():
    response = requests.get(API_ROOT + '?limit=100&offset=500')
    response_body = response.json()
    assert bool(response_body['previous'])


def test_next_link_exists():
    response = requests.get(API_ROOT)
    response_body = response.json()
    assert bool(response_body['next'])


def test_request_length():
    response = requests.get(API_ROOT + '?limit=100&offset=500')
    response_body = response.json()
    assert len(response_body) == 4


def test_create_car():
    response = requests.post(API_ROOT, data=test_post_data)
    assert response.status_code == 201


def test_create_car_with_invalid_data_types():
    data = dict(make=str, model=int, year=bool)
    with pytest.raises(TypeError) as exc:
        response = requests.post(API_ROOT, data=data)


def test_create_car_with_empty_values():
    data = dict(make='', model=None, year='')
    response = requests.post(API_ROOT, data=data)
    # should pass
    assert all(attr in response.json() for attr in data)
    # should fail
    assert response.status_code != 201


def test_create_car_with_long_names():
    data = dict(make='a' * 2000, model='b' * 2000, year='c' * 100)
    response = requests.post(API_ROOT, data=data)
    # should pass
    assert all(attr in response.json() for attr in data)
    # should fail
    assert response.status_code != 201


def test_ids_are_uuid():
    response = requests.get(API_ROOT)
    results = json.loads(response.content)['results']
    # raises ValueError if id is not a valid uuid
    assert [uuid.UUID(car['id']) for car in results]
