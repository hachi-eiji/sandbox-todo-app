class Task < ActiveRecord::Base
  belongs_to :project
  has_many :task_assigns, dependent: :destroy
  has_many :task_notes, dependent: :destroy

  validates :project_id, presence: true
  validates :title, presence: true
  validates :creator_id, presence: true
  validates :updater_id, presence: true
  validates :due_date, feature_date: true

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
      task_notes.each do |task_note|
        DoneTaskNote.create!(id: task_note.id, task_id: task_note.task_id, user_id: task_note.user_id, note: task_note)
      end

      task_assigns.each do |task_assign|
        DoneTaskAssign.create!(id: task_assign.id, task_id: task_assign.task_id, user_id: task_assign.user_id)
      end
      # まとめて削除する
      destroy!
    end
  end
end
