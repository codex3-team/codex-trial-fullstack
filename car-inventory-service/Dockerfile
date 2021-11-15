FROM adoptopenjdk/openjdk11:alpine as build

COPY . /build

WORKDIR /build

# Build service
RUN ./gradlew service:build -x test --stacktrace --warning-mode all

FROM adoptopenjdk/openjdk11:alpine AS deployable

# Install previously built service:
COPY --from=build --chown=root:root /build/service/build/libs/*.jar /app/service.jar

CMD [ "java", "-jar", "/app/service.jar" ]