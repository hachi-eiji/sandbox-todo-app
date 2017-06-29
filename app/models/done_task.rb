class DoneTask < ApplicationRecord
  belongs_to :project
  has_many :done_task_assigns, dependent: :destroy
  has_many :done_task_notes, dependent: :destroy
end
