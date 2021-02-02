# Build the app
FROM node:14-alpine AS build

WORKDIR /app

COPY . .

RUN npm ci --production && \
    npm run build

# Run app
FROM node:14-alpine

WORKDIR /app

# Only copy files required to run the app
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./
COPY --from=build /app/next.config.js ./
COPY --from=build /app/.env.local ./
COPY --from=build /app/package-lock.json ./

RUN npm ci --production && \
    ./node_modules/.bin/next telemetry disable

CMD ["npm", "start", "--", "-p", "5000"]
