require 'web_authn'

class Api::WebAuthn::AccountController < Api::ApiController
  def create
    account = account_params
    unless valid?(account[:name], account[:email])
      render :status => :bad_request and return
    end

    # 複数テーブルにまたがっているのでTransactionをはっておく
    # 中途半端に作られると面倒
    User.transaction do
      # ユーザの作成
      user = User.create!(name: account[:name], email: account[:email])
      # webauthn からchallengeの取得
      # current_challengeに更新
      # クライアントにchallengeデータを返却
      @credential_options = WebAuthn.credential_options(user_id: user.id, user_name: user.name)
      user.web_authn_current_challenge = WebAuthnCurrentChallenge.new(current_challenge: @credential_options[:challenge])
      session[:user_id] = user.id
    end
  end

  private

  def account_params
    params.permit(:name, :email)
  end

  def valid?(user_name, email)
    user_name.present? && email.present?
  end
end

