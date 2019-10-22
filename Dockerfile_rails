FROM hachiyae/rbenv-on-amzn-linux:2.6.4

RUN yum -y update \
  && yum -y install mysql-devel \
  && curl -fsSL https://rpm.nodesource.com/setup_10.x | bash - \
  && yum install -y gcc-c++ make nodejs libxml2

ENV LANG C.UTF-8
ARG MYSQL_HOST
ENV MYSQL_HOST=${MYSQL_HOST}
ARG MYSQL_USER
ENV MYSQL_USER=${MYSQL_USER}
ARG MYSQL_PASSWORD
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}
ARG REDIS_HOST
ENV REDIS_HOST=${REDIS_HOST}
ENV RAILS_ENV=production
ARG RAILS_MASTER_KEY
ENV RAILS_MASTER_KEY=${RAILS_MASTER_KEY}

WORKDIR /todo-app

COPY ./app ./app
COPY ./bin ./bin
COPY ./config ./config
COPY ./lib ./lib
COPY ./log ./log
COPY ./.ruby-version ./.ruby-version
COPY ./config.ru ./config.ru
COPY ./Gemfile ./Gemfile
COPY ./Gemfile.lock ./Gemfile.lock
COPY ./Rakefile ./Rakefile
COPY ./entrypoint.sh ./entrypoint.sh

RUN source /etc/profile
RUN bash -l -c 'bundle install -j 4 --path vendor/bundle'

RUN bash -l -c 'ln -sf /dev/stdout log/production.log'

EXPOSE 3000

CMD ["sh", "./entrypoint.sh"]
