class User < ActiveRecord::Base
  has_many :project_members, dependent: :destroy
  has_many :projects, through: :project_members

  has_many :task_assigns, dependent: :destroy
  has_many :tasks, through: :task_assigns
  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }

  before_create :initialize_activate

  # アクティベート処理を行う
  #
  # @params [String] activate_hash_id アクティベートするためのhash処理
  # @return [true,false] 成功時はtrue
  def activate(activate_hash_id = nil)
    return false if self.active?
    return false if activate_hash_id.blank? || self.activate_hash_id != activate_hash_id
    return false if self.activate_expired_at < Time.current
    update(active: true)
  end

  private

  def initialize_activate
    self.active              = false
    self.activate_expired_at = Time.current + 7.days
    self.activate_hash_id    = SecureRandom.uuid
  end
end
