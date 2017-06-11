source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.7.1'
# Use mysql as the database for Active Record
gem 'mysql2', '>= 0.3.13', '< 0.5'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
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
gem 'redis-rails', '~> 4'

# configure
gem 'config'

gem 'ridgepole'
gem 'activerecord-mysql-awesome'

# template engine
gem 'haml', '~> 4.0', '>= 4.0.7'

# bulk insert
gem 'active_record_bulk_insert', '~> 1.2'

group :development, :test do
  gem 'rspec-rails', '3.5'
  gem 'factory_girl_rails'
  gem 'factory_girl'
  gem 'faker'
  # データを自動的にけす(database_cleanerよりはやいらしい)
  gem 'database_rewinder'
  gem 'pry-rails'
  gem 'pry-byebug'
  gem 'pry-stack_explorer'
  gem 'rubocop'
  gem "onkcop", require: false
  gem 'pronto'
  gem 'pronto-rubocop', require: false
  gem 'pronto-flay', require: false
  gem 'rails_best_practices'
  gem 'brakeman'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end

