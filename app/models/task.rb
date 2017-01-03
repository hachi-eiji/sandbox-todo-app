class Task < ActiveRecord::Base
  belongs_to :project
  has_many :task_assigns, dependent: :destroy
  has_many :task_notes, dependent: :destroy

  validates :project_id, presence: true
  validates :title, presence: true
  validates :creator_id, presence: true
  validates :updater_id, presence: true

  def done
    ActiveRecord::Base.transaction do
      lock!
      DoneTask.create!(
        id:          id,
        project_id:  project_id,
        title:       title,
        description: description,
        due_date:    due_date,
        creator_id:  creator_id,
        updater_id:  updater_id
      )

      done_task_notes = task_notes.map { |task_note|
        {
          id:      task_note.id,
          task_id: task_note.task_id,
          user_id: task_note.user_id,
          note:    task_note.note
        }
      }
      DoneTaskNote.bulk_insert(done_task_notes, { validate: true, use_provided_primary_key: true })

      done_task_assigns = task_assigns.map { |task_assign|
        {
          id:      task_assign.id,
          task_id: task_assign.task_id,
          user_id: task_assign.user_id
        }
      }
      DoneTaskAssign.bulk_insert(done_task_assigns, { validate: true, use_provided_primary_key: true })

      # まとめて削除する
      destroy!
    end
  end
end
