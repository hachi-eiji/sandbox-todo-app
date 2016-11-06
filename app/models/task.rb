class Task < ActiveRecord::Base
  belongs_to :project
  has_many :task_assigns, dependent: :destroy
  has_many :task_notes, dependent: :destroy
end
