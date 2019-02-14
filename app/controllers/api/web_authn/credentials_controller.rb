class Api::WebAuthn::CredentialsController < Api::ApiController
  def create
    user = current_user
    if user.nil?
      @body = {
        id: 'user_not_found',
        message: 'ユーザが存在しない',
        status: 404
      }
      render :status => :not_found and return
    end

    param = response_params
    attestation_response = authenticator_attestation_response(param[:attestationObject], param[:clientDataJSON])

    # TODO: signature_countのvalidationをどこにいれるか？
    # 誤動作をしている可能性を考慮すると面倒かもしれないので現実的には数字を持ってログを吐くぐらいしかできない？
    valid = attestation_response.valid?(
      current_challenge: Base64.strict_decode64(user.web_authn_current_challenge.current_challenge),
      origin_url: request.base_url
    )
    unless valid
      @body = {
        id: 'forbidden',
        message: '認証失敗',
        status: 403
      }
      render :status => :forbidden and return
    end

    # TODO: ここは web_authn_credentials の責務にしたほうが良さそう
    credential = user.web_authn_credentials.find_or_initialize_by(
      external_id: Base64.strict_encode64(attestation_response.credential.id)
    )
    credential.update!(
      public_key: Base64.strict_encode64(attestation_response.credential.public_key),
      signature_count: attestation_response.signature_count
    )

    sign_in user

    @body = { id: 'ok', status: 200 }
  end

  private

  def sign_in(user)
    # TODO: sessionに入れる処理をどこでやろうか
    session[:user_id] = user.id
    user.web_authn_current_challenge.destroy!
  end

  def authenticator_attestation_response(attestation_object, client_data_json)
    WebAuthn::AuthenticatorAttestationResponse.new(
      attestation_object: attestation_object,
      client_data_json: client_data_json
    )
  end

  def response_params
    params.require(:response).permit(:attestationObject, :clientDataJSON)
  end
end
