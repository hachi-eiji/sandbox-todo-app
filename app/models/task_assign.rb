class TaskAssign < ApplicationRecord
  belongs_to :task
  belongs_to :user
end
