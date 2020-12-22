FROM python:3
ENV PYTHONUNBUFFERED=1
COPY . /app

WORKDIR /app/src
RUN pip install -r requirements/requirements.txt
