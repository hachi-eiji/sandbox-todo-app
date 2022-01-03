#!/bin/sh

ENV="${1:-development}"
export RAILS_ENV="${ENV}"
bin/rails db:drop
bin/rails db:create
bin/rails db:migrate
bin/rails db:seed RAILS_ENV=${ENV}
