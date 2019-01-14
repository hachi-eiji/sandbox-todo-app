FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.safe_email }
    created_at { Time.current }
    updated_at { Time.current }

    after(:create) do |u|
      u.password_authentication = FactoryBot.build :valid_password_authentication
    end
  end

  factory :web_authn_user, class: User do
    name { Faker::Name.name }
    email { Faker::Internet.safe_email }
    created_at { Time.current }
    updated_at { Time.current }

    after(:create) do |u|
      u.web_authn_current_challenge = FactoryBot.build :web_authn_current_challenge
    end
  end
end
