class Task < ActiveRecord::Base
  belongs_to :project
  has_many :task_assigns, dependent: :destroy
  has_many :task_notes, dependent: :destroy

  validates :project_id, presence: true
  validates :title, presence: true
  validates :creator, presence: true
  validates :updater, presence: true
end
