class Api::TasksController < Api::ApiController

  def index
    user   = current_user
    @tasks = Task.where(creator_id: user.id).order(:due_date)
  end
end
