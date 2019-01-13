class User < ApplicationRecord
  has_many :project_members, dependent: :destroy
  has_many :projects, through: :project_members

  has_many :task_assigns, dependent: :destroy
  has_many :tasks, through: :task_assigns

  # TODO: この辺はモジュール化したほうが良さそう
  has_one :password_authentication

  has_one :web_authn_current_challenge, dependent: :destroy
  has_many :web_authn_credentials, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }

  before_create :initialize_activate

  delegate :password, to: :password_authentication

  # アクティベート処理を行う
  #
  # @params [String] password パスワード
  # @params [String] activate_hash_id アクティベートするためのhash処理
  # @return [true,false] 成功時はtrue
  def activate(password, activate_hash_id)
    return false if self.active?
    return false unless authenticate_using_password(password)
    return false if activate_hash_id.blank? || self.activate_hash_id != activate_hash_id
    return false if self.activate_expired_at < Time.current
    update!(active: true)
    true
  end

  def login(password)
    self.active? && authenticate_using_password(password)
  end

  private

  def initialize_activate
    self.active              = false
    self.activate_expired_at = Time.current + 7.days
    self.activate_hash_id    = SecureRandom.uuid
  end

  def authenticate_using_password(password)
    password_authentication.authenticate password
  end
end
