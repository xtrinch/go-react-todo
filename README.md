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

## Production setup (run commands in cloned folder):

In production livereloading of Go code and a frontend container are not needed. There are now only two containers: postgres database and go backend. A separate docker-compose file is used, as seen below. Run the following scripts in your cloned git directory:

    $ cd client/ && npm run-script build
    $ cd ../ && docker-compose -f docker-compose.prod.yml up -d

You server container will be listening at port 8080 as exposed in docker-compose.prod.yml, which is where you point nginx, other files are served as static:

    server {
        listen 0.0.0.0:80;
        server_name go-react-todo.trina.si;
        root /home/go-react-todo/go-react-todo/client/build;
        location / {
            try_files $uri $uri/ /index.html;
        }
        location /api {
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header Host $http_host;
          proxy_set_header X-NginX-Proxy true;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection "upgrade";
          proxy_pass http://localhost:8080/api;
          proxy_redirect off;
        }
     }


## API endpoints

- **GET** api/v1/todos/
- **GET** api/v1/todos/:id
- **POST** api/v1/todos
- **PUT** api/v1/todos/:id
- **DELETE** api/v1/todos/:id
