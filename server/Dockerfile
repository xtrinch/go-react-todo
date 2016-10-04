FROM golang:1.6-onbuild
RUN go get gopkg.in/gorp.v1
RUN go get github.com/codegangsta/gin
RUN go get github.com/lib/pq
RUN go get github.com/gin-gonic/gin
RUN go build main.go structs.go
ENV PORT 8080
