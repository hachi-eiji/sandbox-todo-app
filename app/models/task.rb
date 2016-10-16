class Task < ActiveRecord::Base
  belongs_to :project
  has_many :task_assigns
  has_many :task_notes
end
