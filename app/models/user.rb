class User < ActiveRecord::Base
  has_many :project_members, dependent: :destroy
  has_many :projects, through: :project_members

  has_many :task_assigns, dependent: :destroy
  has_many :tasks, through: :task_assigns
  has_secure_password
end
