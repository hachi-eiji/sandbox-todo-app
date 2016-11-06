class TaskService
  # タスクをdoneの状態にする
  # @param [Integer] id
  def done(id)
    ActiveRecord::Base.transaction do
      task = Task.lock.find(id)
      DoneTask.create!(
        id:          task.id,
        project_id:  task.project_id,
        title:       task.title,
        description: task.description,
        due_date:    task.due_date,
        creator_id:  task.creator_id,
        updater_id:  task.updater_id
      )
      task_notes = task.task_notes
      task_notes.each do |task_note|
        DoneTaskNote.create!(id: task_note.id, task_id: task_note.task_id, user_id: task_note.user_id, note: task_note)
      end

      task_assigns = task.task_assigns
      task_assigns.each do |task_assign|
        DoneTaskAssign.create!(id: task_assign.id, task_id: task_assign.task_id, user_id: task_assign.user_id)
      end
      # まとめて削除する
      task.destroy!
    end
  end
end
