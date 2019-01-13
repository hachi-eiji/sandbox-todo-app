require 'rails_helper'

describe WebAuthn::AuthenticatorData do
  let(:origin_challenge) { SecureRandom.random_bytes(32) }
  let(:options) { { sign_count: 100, up_flag: 0 } }
  let(:authenticator) { WebAuthn::Fake::Create.new(challenge: origin_challenge, options: options) }
  let(:auth_data) { authenticator.authenticator_data }

  it 'get signature_count' do
    authenticator_data = WebAuthn::AuthenticatorData.new(auth_data)
    expect(authenticator_data.signature_count).to eq 100
  end

  it 'get flag' do
    authenticator_data = WebAuthn::AuthenticatorData.new(auth_data)
    expect(authenticator_data.flags[0]).to eq '0'
    expect(authenticator_data.flags[2]).to eq '1'
  end
end
