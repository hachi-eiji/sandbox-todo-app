require 'rails_helper'

describe WebAuthn::WebAuthn do
  describe 'credential_options' do
    let(:user_name) { 'john doe' }
    let(:display_name) { "display #{user_name}" }
    let(:id) { 1 }

    it {
      options = WebAuthn.credential_options(user_id: id, user_name: user_name, display_name: display_name)
      expect(options[:pubKeyCredParams]).to eq([{ type: 'public-key', alg: -7 }])
      expect(options[:rp]).to eq({ id: Settings.webauthn.rp.id, name: Settings.webauthn.rp.name })
      expect(options[:user]).to eq({
         name: user_name,
         display_name: display_name,
         id: Base64.strict_encode64(id.to_s),
         icon: Settings.webauthn.user.icon
      })
      expect(options[:attestation]).to eq(Settings.webauthn.attestation)
    }

  end
end
