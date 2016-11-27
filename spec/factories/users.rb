FactoryGirl.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.safe_email }
    password 'test'
    password_confirmation 'test'
    created_at Time.now
    updated_at Time.now
  end
end
