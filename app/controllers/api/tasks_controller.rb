class Api::TasksController < Api::ApiController
  def index
    user   = current_user
    if user.nil?
      raise NotFoundError, 'user_not_found'
    else
      @tasks = Task.where(creator_id: user.id).order(:due_date)
    end
  end

  def update
    param = task_params
    task = Task.find(params[:id])
    if param[:done]
      task.done
    else
      task.update!(param)
    end
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy!
  end

  private

  def task_params
    params.require(:task).permit(:title, :due_date, :done)
  end
end
