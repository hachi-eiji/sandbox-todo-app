FactoryBot.define do
  factory :web_authn_current_challenge do
    current_challenge { SecureRandom.base64 32 }
  end
end
