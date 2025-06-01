FROM node:latest as frontend-builder

WORKDIR /app
COPY /brassbook-frontend/package*.json ./
RUN npm ci

COPY /brassbook-frontend/ .
RUN npm run build

# Финальный образ с Nginx
FROM nginx:latest
# Удаляем дефолтные конфиги
RUN rm -rf /etc/nginx/conf.d/*

# Копируем наш конфиг
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем статику из этапа сборки
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# Копируем статику из src/assets в папку для статичных ресурсов
COPY /brassbook-frontend/src/assets /usr/share/nginx/html/assets

# Копируем SSL сертификаты (если есть)
COPY ssl/ /etc/nginx/ssl/

# Права для nginx
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
