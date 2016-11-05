class DoneTask < ActiveRecord::Base
  belongs_to :project
  has_many :done_task_assigns
  has_many :done_task_notes
end
