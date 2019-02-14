class PasswordAuthentication < ApplicationRecord
  belongs_to :user

  has_secure_password
end
