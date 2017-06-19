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
Live reloading is provided by codegangsta/Gin.

## Production setup:

In production livereloading of Go code and a frontend container are not needed. There are now only three containers: postgres database, go backend and a nginx container. A separate docker-compose file is used, as seen below. Run the following scripts in your cloned git directory:

    $ cd client/ && npm run-script build # will create build directory in ../nginx/, where it is then mounted into nginx container to be served as static files
    $ cd ../ && docker-compose -f docker-compose.prod.yml up -d

You server container will be listening at port 8002 as exposed in docker-compose.prod.yml.

## API endpoints

- **GET** api/v1/todos/
- **GET** api/v1/todos/:id
- **POST** api/v1/todos
- **PUT** api/v1/todos/:id
- **DELETE** api/v1/todos/:id
