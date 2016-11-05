class Api::LoginController < Api::ApiController
  def show
    param = login_params
    user  = User.find_by(email: param['loginId'])
    auth  = user && user.authenticate(param['password'])

    if auth
      session[:user_id] = auth.id

      @body = {
          id:      'ok',
          message: 'user_exists',
          status:  200
        }
      else
        @body = {
          id:      'login_failed',
          message: 'ログインID・パスワードが間違っています',
          status:  404
        }
        render 'api/login/show', status: 404
      end
  end

  private

  def login_params
    json_params = ActionController::Parameters.new(JSON.parse(request.body.read))
    json_params.permit(:loginId, :password)
  end
end
