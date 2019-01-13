require 'rails_helper'

RSpec.describe 'Api::WebAuthn:Account', type: :request do
  include RequestHelper
  let!(:rp_id) { Settings.webauthn.rp.id }
  let(:rp_name) { Settings.webauthn.rp.name }
  let(:icon) { Settings.webauthn.user.icon }

  describe 'POST /api/web_authn/account' do
    before do
      post api_web_authn_account_index_path, headers: header, params: { name: name, email: email }
    end

    context 'name is empty' do
      let(:name) { '' }
      let(:email) { 'example@example.com' }
      it { expect(response).to have_http_status 400 }
    end

    context 'email is empty' do
      let(:name) { 'john doe' }
      let(:email) { '' }
      it { expect(response).to have_http_status 400 }
    end

    context 'name and email is not empty' do
      let(:name) { 'john doe' }
      let(:email) { 'example@example.com' }
      let(:user) { User.find_by(email: email) }
      it { expect(response).to have_http_status 200 }

      it 'should create a user' do
        expect(user.web_authn_current_challenge.current_challenge).to eq body[:challenge]
      end

      it 'should response is have data for webauthn' do
        expect(body[:challenge].length).not_to be_nil
        expect(body[:pubKeyCredParams]).to eq([{ type: 'public-key', alg: -7 }])
        expect(body[:rp]).to eq(id: rp_id, name: rp_name)
        expect(body[:user]).to eq(
          name: name,
          display_name: name,
          id: Base64.strict_encode64(user.id.to_s),
          icon: icon
        )
        expect(body[:attestation]).to eq 'direct'
      end
    end
  end
end
