class Project < ActiveRecord::Base
  has_many :project_members, dependent: :destroy
  has_many :tasks, dependent: :destroy
  has_many :done_tasks, dependent: :destroy
  belongs_to :user
end
