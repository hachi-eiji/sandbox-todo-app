## sandbox TODO web application

Sandbox of the following middlewares

* Ruby on Rails
* React
* Docker

### directory

* client - front-end
* docker - docker
* mock-api - mock API server
* others - Rails

## setup

set environment value

| Key | Value |
|---|---|
| MYSQL_HOST | DB host name |
| MYSQL_USER | DB user name |
| MYSQL_PASSWORD | db password |
| REDIS_HOST | redis host |

run docker

```
docker-compose up -d
```

run ridgepole

```
ridgepole --env production --apply -c config/database.yml -f db/schemas/Schemafile
```
