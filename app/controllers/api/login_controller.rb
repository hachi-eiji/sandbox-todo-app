class Api::LoginController < Api::ApiController
  def show
    param = login_params
    user  = User.find_by(email: param['login_id'])
    body  = if user && user.authenticate(param['password'])
              {
                id:      'ok',
                message: 'user_exists',
                status:  200
              }
            else
              # TODO(hachi-eiji): i18n対応
              {
                id:      'login_failed',
                message: 'ログインID・パスワードが間違っています',
                status:  404
              }
            end
    render_json(body)
  end

  private

  def login_params
    json_params = ActionController::Parameters.new(JSON.parse(request.body.read))
    json_params.permit(:login_id, :password)
  end
end
