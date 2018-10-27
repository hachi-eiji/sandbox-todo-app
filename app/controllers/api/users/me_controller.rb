class Api::Users::MeController < Api::ApiController
  def index
    current_user
    raise NotFoundError if current_user.nil?
  end
end
