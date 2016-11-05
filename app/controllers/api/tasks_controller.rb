class Api::TasksController < Api::ApiController
  def index
    user   = current_user
    @tasks = Task.where(creator_id: user.id).order(:due_date)
  end

  def update
    task = Task.find(params[:id])
    task.update!(task_params)
  end

  private

  def task_params
    params.require(:task).permit(:title, :due_date)
  end
end
