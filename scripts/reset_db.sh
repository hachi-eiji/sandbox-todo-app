#!/bin/sh

ENV="${1:-development}"
bin/rails db:drop RAILS_ENV=${ENV}
bin/rails db:create RAILS_ENV=${ENV}
echo "apply ridgepole to ${ENV}"
bundle exec ridgepole -c config/database.yml -f db/schemas/Schemafile --apply -E ${ENV}
bin/rails db:seed RAILS_ENV=${ENV}
