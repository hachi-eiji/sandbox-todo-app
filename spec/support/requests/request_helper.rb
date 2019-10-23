module RequestHelper
  def header
    { ACCEPT: 'application/json' }
  end

  # @param [User] user
  def sign_in(user)
    post api_activate_path,
         params: { loginId: user.email, password: user.password, code: user.activate_hash_id },
         headers: header
    # 200のチェックをしてログイン成功していることを担保する
    expect(response).to have_http_status(200)
  end

  def json
    @___json___ ||= JSON.parse(response.body, { symbolize_names: true })
  end
end
