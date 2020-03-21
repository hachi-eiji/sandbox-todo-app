class Project < ApplicationRecord
  has_many :project_members, dependent: :destroy
  has_many :task, dependent: :destroy
  has_many :done_tasks, dependent: :destroy
  belongs_to :user

  class << self
    def personal(user_id)
      find_by(user_id: user_id)
    end
  end
end
