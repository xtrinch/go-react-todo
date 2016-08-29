# go-todo

Todo REST API written in Go, setup using docker & docker-compose.

Database library for postgres is [Gorp](https://github.com/go-gorp/gorp),
livereloading goes to [codegangsta/Gin](https://github.com/codegangsta/gin),
HTTP framework used is [gin-gonic/gin](https://github.com/gin-gonic/gin).

## Requirements

- docker
- docker-compose

## Development setup:

    $ docker-compose up

Find your docker-machine IP by running

    $ docker-machine env default

Access the todo API via port 8080.

## API endpoints

- GET api/v1/todos/
- GET api/v1/todos/:id
- POST api/v1/todos
- PUT api/v1/todos/:id
- DELETE api/v1/todos/:id
