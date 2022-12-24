# Multi-threading in node.js

A RESTful API that uses a worker thread to fetch data from an endpoint, parse it, and save to postgres database.

## Technologies Used

- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/download/)
- [ExpressJS](https://expressjs.com/)
- [Postgres](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

Check package.json for other tools

## Getting Started

---

### Installing/Run locally

- Make sure you have `nodejs` installed.

  bash

  - yarn

  - Create/configure `.env` environment according to env.example file.

  - Run `yarn build` to compile the application.
  - Run `yarn start` to start the server

### Run with docker

- Make sure you have `docker` installed.

  bash

  - cd to the folder directory and Run `docker compose up`

### Testing

- To test or consume the API locally, you can make use of [Postman](https://documenter.getpostman.com/view/19915303/VUjTmPCY) to simulate a front-end client.
- You can also test by running `yarn test`.

## HTTP Requests

All API requests are made by sending a HTTP request using one of the following methods, depending on the action being taken:

- `POST` Create a data
- `GET` Get a data

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- `200` `OK` The request was successful
- `400` `Bad Request` There was a problem with the request (security, malformed)
- `500` `Internal serval error` There was a problem with the network or database

#
