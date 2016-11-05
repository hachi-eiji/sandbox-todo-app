class Api::TasksController < Api::ApiController

  def index
    user   = current_user
    @tasks = Task.find_by(creator_id: user.id)
  end
end
