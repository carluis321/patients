FROM composer:2.6.5 as build

WORKDIR /app/src

COPY . .

RUN composer install

FROM php:8.2-apache
WORKDIR /var/www/html

RUN apt-get update

RUN apt-get install -y libxml2-dev

RUN echo "ServerName laravel-app.local" >> /etc/apache2/apache2.conf

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN docker-php-ext-install xml
RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable pdo_mysql

COPY --from=build /app/src .

RUN apt install -y nodejs
RUN apt install -y npm
RUN npm -v
RUN npm install

RUN npm run build

EXPOSE 80

# CMD [ "php artisan serve" ]