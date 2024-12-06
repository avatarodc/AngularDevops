FROM nginx:alpine

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers de build
COPY dist/student-management /usr/share/nginx/html

EXPOSE 80
