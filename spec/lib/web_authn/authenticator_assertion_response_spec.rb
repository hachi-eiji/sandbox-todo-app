require 'rails_helper'

describe WebAuthn::AuthenticatorAssertionResponse do
  describe '#valid?' do
    let(:authenticator) { WebAuthn::Fake::Create.new(challenge: origin_challenge, options: options) }
    let(:origin_challenge) { SecureRandom.random_bytes(32) }
    let(:client_data_json) { authenticator.encode_client_data_json }
    let(:attestation_object) { authenticator.encode_attestation_object }
    let(:options) { {} } # あまりよくないけど上書き用
    let(:rp_id) { nil } # あまりよくないけど上書き用
    let(:response) {
      WebAuthn::AuthenticatorAssertionResponse.new(
        client_data_json: client_data_json,
        attestation_object: attestation_object
      )
    }
    subject { response.valid?(current_challenge: current_challenge, origin_url: origin_url, rp_id: rp_id) }

    context 'rp_id is nil and the data is valid' do
      let(:origin_url) { 'http://localhost' }
      let(:current_challenge) { origin_challenge }
      it { is_expected.to be_truthy }
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
