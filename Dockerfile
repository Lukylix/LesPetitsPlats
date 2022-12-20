FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY . .
EXPOSE 80
STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]