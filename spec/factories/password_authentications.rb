FactoryBot.define do
  factory :valid_password_authentication, class: PasswordAuthentication do
    password { 'test' }
    password_confirmation { 'test' }
  end
end
