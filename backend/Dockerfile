# backend/Dockerfile
# FROM golang:1.21-alpine
FROM golang:1.24-alpine

WORKDIR /app

# RUN apk add --no-cache git netcat
RUN apk add --no-cache git busybox-extras

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend/. .
RUN go build -o main .

# CMD ["/wait-for-it.sh", "db", "5432", "--", "./main"]
CMD ["/wait-for-it.sh", "db", "5432", "--", "./main"]

