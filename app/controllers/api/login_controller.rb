class Api::LoginController < Api::ApiController
  def show
    param = login_params
    user = User.find_by(email: param[:loginId])
    auth = user && user.login(param[:password])

    status = 200
    if auth
      session[:user_id] = auth.id
      @body = {
        id:      'ok',
        message: 'user_exists',
        status:  status
        }
    else
      status  = 404
        @body = {
          id:      'login_failed',
          message: 'ログインID・パスワードが間違っています',
          status: status
        }
    end
    render 'api/login/show', status: status
  end


  def activate
    param = login_params
    user  = User.find_by(email: param[:loginId])
    auth  = user && user.activate(param[:password], param[:code])

    status = 200
    if auth
      session[:user_id] = auth.id
      @body = {
        id:      'ok',
        message: 'user_exists',
        status:  status
      }
    else
      status  = 404
      @body = {
        id:      'login_failed',
        message: 'ログインID・パスワード・アクティベートコードが間違っています',
        status: status
      }
    end
    render 'api/login/show', status: status
  end

  private

  def login_params
    json_params.permit(:loginId, :password, :code)
  end
end
