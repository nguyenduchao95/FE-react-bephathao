FROM nginx:alpine
    # Copy config nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
    # Remove default nginx static assets
RUN rm -rf ./*
    # Copy static assets from builder stage
COPY build .

    # Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]