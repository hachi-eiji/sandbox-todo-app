class DoneTaskAssign < ActiveRecord::Base
  belongs_to :done_task
  belongs_to :user
end
