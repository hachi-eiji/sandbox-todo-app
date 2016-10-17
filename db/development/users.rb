require 'faker'

User.delete_all
10.times do
  User.create!(
    name:                  Faker::Name.last_name,
    email:                 Faker::Internet.safe_email,
    password_digest:       'test',
    password_confirmation: 'test',
    active:                true
  )
end
