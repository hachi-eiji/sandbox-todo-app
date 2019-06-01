FROM ruby:2.6-alpine

WORKDIR /var/lib/mockapi

COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock

RUN apk update \
  && apk --no-cache add \
    bash \
    build-base \
    curl-dev \
    git \
    libxml2-dev \
    libxslt-dev \
    linux-headers \
    nodejs \
    openssh \
    ruby-json \
    tzdata \
    yaml \
    yaml-dev \
    zlib-dev \
  && bundle install --path vendor/bundle


