require 'faker'

10.times do |i|
  User.create!(
    name:                  Faker::Name.last_name,
    email:                 "test#{i}@example.com",
    password:              'test',
    password_confirmation: 'test',
    active:                true
  )
end
