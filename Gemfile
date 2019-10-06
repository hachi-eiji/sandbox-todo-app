source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby File.read('.ruby-version')

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '6.0.0'
# Use mysql as the database for Active Record
gem 'mysql2', '>= 0.4.4'
# Use Puma as the app server
gem 'puma', '~> 3.11'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

gem 'migration_comments'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# redis
gem 'redis-rails'

# configure
gem 'config'

gem 'ridgepole', '0.8.3', github: 'winebarrel/ridgepole', branch: '0.8'

# bulk insert
gem 'active_record_bulk_insert', '~> 1.2'

gem 'rack-cors'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

# log formatter
gem 'lograge'

group :development, :test do
  gem 'rspec-rails', '3.5'
  gem 'factory_bot_rails'
  gem 'factory_bot'
  gem 'faker'
  gem 'pry-rails'
  gem 'pry-byebug'
  gem 'pry-stack_explorer'
end

group :development do
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
end

