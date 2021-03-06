class Task < ApplicationRecord
  belongs_to :project
  has_many :task_assigns, dependent: :destroy
  has_many :task_notes, dependent: :destroy

  validates :project_id, presence: true
  validates :title, presence: true, length: { in: 1..100 }
  validates :creator_id, presence: true
  validates :updater_id, presence: true

  # タスクが変更可能か
  #
  # @param [Integer] user_id ユーザID
  # @return [TrueClass|FalseClass]
  def modifiable?(user_id)
    !project.project_members.select { |member| member.user_id == user_id }.empty?
  end

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
          id: task_note.id,
          task_id: task_note.task_id,
          user_id: task_note.user_id,
          note: task_note.note,
          created_at: Time.now,
          updated_at: Time.now
        }
      }
      DoneTaskNote.insert_all!(done_task_notes) unless done_task_notes.empty?

      done_task_assigns = task_assigns.map { |task_assign|
        {
          id: task_assign.id,
          task_id: task_assign.task_id,
          user_id: task_assign.user_id,
          created_at: Time.now,
          updated_at: Time.now
        }
      }
      DoneTaskAssign.insert_all!(done_task_assigns) unless done_task_assigns.empty?

      # まとめて削除する
      destroy!
    end
  end
end
