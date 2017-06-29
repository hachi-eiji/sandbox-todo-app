class DoneTaskAssign < ApplicationRecord
  belongs_to :done_task
  belongs_to :user
end
