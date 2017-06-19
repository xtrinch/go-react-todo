# Set nginx base image
FROM nginx

ADD build /home/go-react-todo/go-react-todo/client/build/

# Copy custom configuration file from the current directory
COPY nginx.conf /etc/nginx/nginx.conf
