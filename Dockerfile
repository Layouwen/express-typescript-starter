FROM --platform=linux/amd64 node:16.19.1-alpine
WORKDIR /app

COPY ./deploy /app/deploy

ENTRYPOINT ["/app/deploy/express-typescript-starter"]
