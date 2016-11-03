class Api::LoginController < ApplicationController
  def show
    param       = login_params
    user        = User.find_by(email: param['login_id'])
    @exist_user = user && user.authenticate(param['password'])
  end

  private

  def login_params
    json_params = ActionController::Parameters.new(JSON.parse(request.body.read))
    json_params.permit(:login_id, :password)
  end
end
