class Api::TasksController < Api::ApiController
  def index
    user   = current_user
    if user.nil?
      raise NotFoundError, 'user_not_found'
    else
      @tasks = Task.where(creator_id: user.id).order(:due_date)
    end
  end

  def create
    param = task_create_params
    user    = current_user
    project = Project.personal(user.id)
    Task.create!(param.merge({ creator_id: user.id, updater_id: user.id, project_id: project.id }))
  end

  def update
    param = task_params
    task  = Task.find(param[:id])
    if param[:done]
      task.done
    else
      task.update!(param)
    end
  end

  def destroy
    task = Task.find(params[:id])
    unless task.modifiable?(current_user.id)
      raise NotFoundError
    end
    task.destroy!
  end

  private

  def task_params
    params.permit(:title, :due_date, :done, :id, :description)
  end

  def task_create_params
    params.permit(:title, :due_date, :description)
  end
end
