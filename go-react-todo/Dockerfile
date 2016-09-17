FROM richarvey/nginx-nodejs:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY start.sh /usr/src/app

CMD ["/bin/bash", "start.sh"]
