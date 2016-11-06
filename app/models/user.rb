class User < ActiveRecord::Base
  has_many :project_members, dependent: :destroy
  has_many :projects, through: :project_members

  has_many :task_assigns, dependent: :destroy
  has_many :tasks, through: :task_assigns
  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }

  def before_create
    self.active = false
  end

  def activate
    update(active: true) unless active?
  end
end
