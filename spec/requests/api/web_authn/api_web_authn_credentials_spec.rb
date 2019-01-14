require 'rails_helper'

RSpec.describe "Api::WebAuthn::Credentials", type: :request do
  include RequestHelper

  describe "POST /api/web_authn/credentials" do
    let(:sign_count) { 10 }
    let(:mock) { WebAuthn::Fake::Create.new(options: { sign_count: sign_count }) }
    let(:attestationObject) { mock.encode_attestation_object }
    let(:clientDataJSON) { mock.encode_client_data_json }

    let(:params) {
      { response: { attestationObject: attestationObject, clientDataJSON: clientDataJSON } }
    }
    context 'user not exists' do
      it 'should respond 404 error ' do
        post api_web_authn_credentials_path, params: params, headers: header
        expect(response).to have_http_status(404)
        expect(body).to eq(
          id: 'user_not_found',
          message: 'ユーザが存在しない',
          status: 404,
          token: 'token'
        )
      end
    end

    context 'valid is falsely' do
      before do
        register_web_authn_user('john doe', 'test@example.com')
        allow_any_instance_of(WebAuthn::AuthenticatorAttestationResponse).to receive(:valid?).and_return false
      end

      it 'should respond 403 error' do
        post api_web_authn_credentials_path, params: params, headers: header
        expect(response).to have_http_status(403)
        expect(body).to eq(
          id: 'forbidden',
          message: '認証失敗',
          status: 403,
          token: 'token'
        )
      end
    end

    context 'valid is truly' do
      let(:name) { 'jonh doe' }
      let(:email) { 'test@example.com' }
      before do
        register_web_authn_user(name, email)
        allow_any_instance_of(WebAuthn::AuthenticatorAttestationResponse).to receive(:valid?).and_return true
        post api_web_authn_credentials_path, params: params, headers: header
      end

      it 'should respond 200 status' do
        expect(response).to have_http_status(200)
        expect(body).to eq(id: 'ok', message: nil, status: 200, token: 'token')
      end

      it 'store webauthn data' do
        authenticator_data = WebAuthn::AuthenticatorData.new(mock.authenticator_data)
        attested_cred_data = authenticator_data.attested_cred_data
        user = User.find_by(name: name, email: email)
        web_authn_credentials = user.web_authn_credentials

        expect(user.web_authn_current_challenge).to be_nil
        expect(web_authn_credentials.count).to eq 1
        expect(web_authn_credentials.first.external_id).to eq Base64.strict_encode64(attested_cred_data.credential_id)
        expect(web_authn_credentials.first.public_key).to eq Base64.strict_encode64(attested_cred_data.credential_public_key)
        expect(web_authn_credentials.first.signature_count).to eq sign_count
      end
    end
  end
end
