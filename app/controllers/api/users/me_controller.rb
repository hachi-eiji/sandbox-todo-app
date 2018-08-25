class Api::Users::MeController < Api::ApiController
  def index
    current_user
  end
end
