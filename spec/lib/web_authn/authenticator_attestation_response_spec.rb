require 'rails_helper'

describe WebAuthn::AuthenticatorAttestationResponse do
  describe '#valid?' do
    let(:authenticator) { WebAuthn::Fake::Create.new(challenge: origin_challenge, options: options) }
    let(:origin_challenge) { SecureRandom.random_bytes(32) }
    let(:encode_client_data_json) { authenticator.encode_client_data_json }
    let(:encode_attestation_object) { authenticator.encode_attestation_object }
    let(:options) { { sign_count: 1 } } # あまりよくないけど上書き用
    let(:rp_id) { nil } # あまりよくないけど上書き用
    let(:response) {
      WebAuthn::AuthenticatorAttestationResponse.new(
        client_data_json: encode_client_data_json,
        attestation_object: encode_attestation_object
      )
    }
    subject { response.valid?(current_challenge: current_challenge, origin_url: origin_url, rp_id: rp_id) }

    before do
      authenticator_data = WebAuthn::AuthenticatorData.new(authenticator.authenticator_data)
      attestation_statement = instance_double(WebAuthn::AttestationStatement::Packed)
      allow(attestation_statement).to receive(:valid?).with(authenticator_data, encode_client_data_json).and_return(true)
      allow(response).to receive(:authenticator_data).and_return(authenticator_data)
      allow(response).to receive(:attestation_statement).and_return(attestation_statement)
    end

    context 'rp_id is nil and the data is valid' do
      let(:origin_url) { 'http://localhost' }
      let(:current_challenge) { origin_challenge }
      it { is_expected.to be_truthy }
      it { expect(response.credential).not_to be_nil }
      it { expect(response.signature_count).to eq options[:sign_count] }
    end

    context 'rp_id is not nil and the data is valid' do
      let(:origin_url) { 'http://localhost' }
      let(:rp_id) { 'localhost' }
      let(:current_challenge) { origin_challenge }
      it { is_expected.to be_truthy }
    end

    context 'does not match origin_url' do
      let(:origin_url) { 'http://example.com' }
      let(:current_challenge) { origin_challenge }
      it { is_expected.to be_falsey }
    end

    context 'does not match challenge' do
      let(:origin_url) { 'http://localhost' }
      let(:current_challenge) { SecureRandom.random_bytes(32) }
      it { is_expected.to be_falsey }
    end

    context 'does not match type' do
      let(:origin_url) { 'http://localhost' }
      let(:current_challenge) { origin_challenge }
      let(:options) { { type: 'invalid' } }
      it { is_expected.to be_falsey }
    end

    context 'up_flag is 0 and uv_flag is 0' do
      let(:origin_url) { 'http://localhost' }
      let(:current_challenge) { origin_challenge }
      let(:options) { { uv_flag: 0, up_flag: 0 } }
      it { is_expected.to be_falsey }
    end

    context 'does not match rp_id' do
      let(:origin_url) { 'http://localhost' }
      let(:current_challenge) { origin_challenge }
      let(:rp_id) { 'example.com' }
      it { is_expected.to be_falsey }
    end
  end
end
