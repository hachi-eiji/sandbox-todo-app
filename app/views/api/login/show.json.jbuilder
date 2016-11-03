if @exist_user
  json.status 200
  json.id 'user_exists'
  json.message 'ok'
else
  json.status 404
  json.id 'login_failed'
  json.message 'ログインID・パスワードが間違っています'
end
