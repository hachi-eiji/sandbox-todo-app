class Api::Me::SessionController < Api::ApiController
  def index
    current_user
    raise NotFoundError if current_user.nil?
  end
end
