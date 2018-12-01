FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.safe_email }
    password { 'test' }
    password_confirmation { 'test' }
    created_at { Time.current }
    updated_at { Time.current }
  end
end
