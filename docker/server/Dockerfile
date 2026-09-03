FROM php:8.4-apache

ARG user
ARG uid

# 1. Update packages & install OS dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    curl \
    libpq-dev \
    sqlite3 \
    libsqlite3-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    && rm -rf /var/lib/apt/lists/*

# 2. Enable required Apache modules
RUN a2enmod rewrite headers

# 3. Install core PHP extensions needed by Laravel 12
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions \
    bcmath \
    ctype \
    curl \
    dom \
    fileinfo \
    gd \
    mbstring \
    mysqli \
    openssl \
    pcntl \
    pdo_mysql \
    pdo_pgsql \
    pdo_sqlite \
    tokenizer \
    xml \
    zip \
    redis

# 4. Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# 5. Create non-root user for local permissions matching host machine
RUN useradd -G www-data,root -u ${uid} -d /home/${user} ${user} && \
    mkdir -p /home/${user}/.composer && \
    chown -R ${user}:${user} /home/${user}

# 6. Set working directory
WORKDIR /var/www/html

# Keep root user for Apache to bind port 80 properly while delegating CLI rights to ${user}