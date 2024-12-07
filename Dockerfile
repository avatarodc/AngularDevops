# Stage 1: Build
FROM node:latest as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration=production

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/dist/student-management/browser/* /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
