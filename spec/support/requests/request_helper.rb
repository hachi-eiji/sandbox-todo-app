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

  # @param [String] name
  # @param [String] email
  def register_web_authn_user(name, email)
    post api_web_authn_account_index_path, params: { name: name, email: email }, headers: header
    # 200のチェックをしてログイン成功していることを担保する
    expect(response).to have_http_status(200)
  end

  def body
    @___json___ ||= JSON.parse(response.body, { symbolize_names: true })
  end
end
