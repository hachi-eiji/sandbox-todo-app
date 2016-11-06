FactoryGirl.define do
  factory :user do
    p = Faker::Internet::password
    name { Faker::Name.name }
    email { Faker::Internet.safe_email }
    password p
    password_confirmation p
    created_at Time.now
    updated_at Time.now
  end
end
