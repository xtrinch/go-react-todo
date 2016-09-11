# go-react-todo

    - Todo REST API in Go
    - React frontend client with Redux.
    - Setup with docker & docker-compose.

Database library for postgres is [Gorp](https://github.com/go-gorp/gorp),
livereloading goes to [codegangsta/Gin](https://github.com/codegangsta/gin),
HTTP framework used is [gin-gonic/gin](https://github.com/gin-gonic/gin).

Docker-compose file contains the definition for three containers -
database (postgres), backend (Go) and frontend (React).

## Requirements

    - docker
    - docker-compose

## Development setup:

    $ docker-compose up

Find your docker-machine IP by running

    $ docker-machine env default

Go todo API (backend) can be accessed at port 8080, webpack-dev-server
(react frontend) at 9000.
Requests from webpack-dev-server are proxied to the Go container by
webpack conifig.

## Production setup:

    - A story in the making

## API endpoints

    - GET api/v1/todos/
    - GET api/v1/todos/:id
    - POST api/v1/todos
    - PUT api/v1/todos/:id
    - DELETE api/v1/todos/:id
