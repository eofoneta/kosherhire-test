# Stage 1 - Build React app
FROM node:18 AS frontend-build

WORKDIR /app
COPY frontend/ ./
RUN npm install
RUN npm run build

# Stage 2 - Serve with nginx
FROM nginx:alpine AS frontend-prod

COPY --from=frontend-build /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
