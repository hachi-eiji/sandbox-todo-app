require 'faker'

10.times do
  User.create!(
    name:                  Faker::Name.last_name,
    email:                 Faker::Internet.safe_email,
    password:              'test',
    password_confirmation: 'test',
    active:                true
  )
end
