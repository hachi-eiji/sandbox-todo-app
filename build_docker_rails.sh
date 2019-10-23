docker build -f Dockerfile_rails \
  --build-arg MYSQL_HOST=${MYSQL_HOST} \
  --build-arg MYSQL_PASSWORD=${MYSQL_PASSWORD} \
  --build-arg MYSQL_USER=${MYSQL_USER} \
  --build-arg REDIS_HOST=${REDIS_HOST} \
  --build-arg RAILS_MASTER_KEY=${RAILS_MASTER_KEY} -t hachiyae/sandbox-todo-app-rails .
