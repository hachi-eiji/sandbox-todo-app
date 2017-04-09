FROM hachiyae/rbenv-on-amzn-linux:latest

RUN yum -y update \
  && yum -y install mysql-devel \
  && curl -fsSL https://rpm.nodesource.com/setup_7.x | bash - \
  && yum install -y gcc-c++ make nodejs
RUN mkdir /var/lib/sandbox-todo-app
WORKDIR /var/lib/sandbox-todo-app

COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN bash -l -c bundle config build.nokogiri --use-system-libraries
RUN bash -l -c bundle install --path vendor/bundle
