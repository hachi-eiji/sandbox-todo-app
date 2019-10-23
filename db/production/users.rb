require 'faker'

10.times do |i|
  User.create!(
    name:                  Faker::Name.last_name,
    email:                 "test#{i}@example.com",
    password:              'test',
    password_confirmation: 'test',
    activate_hash_id:      'test_hash_id',
    activate_expired_at:   Time.current,
    active:                true
  )
end
