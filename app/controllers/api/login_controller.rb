class Api::LoginController < ApiController
  def show
    param = login_params
    user  = User.find_by(email: param['login_id'])
    body  = {}

    # TODO(hachi-eiji): refactoring
    if user && user.authenticate(param['password'])
      body['id']      = 'ok'
      body['message'] = 'user_exists'
      body['status']  = 200
    else
      body['id']      = 'login_failed'
      body['message'] = 'ログインID・パスワードが間違っています'
      body['status']  = 404
    end
    render_json(body)
  end

  private

  def login_params
    json_params = ActionController::Parameters.new(JSON.parse(request.body.read))
    json_params.permit(:login_id, :password)
  end
end
