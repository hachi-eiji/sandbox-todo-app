#!/bin/sh

docker-compose up -d

pushd `dirname $0`
time bundle exec ridgepole -c config/database.yml -f db/schemas/Schemafile --apply
popd
