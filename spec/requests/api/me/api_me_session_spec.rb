require 'rails_helper'

RSpec.describe 'Api::Me::Session', type: :request do
  include RequestHelper

  let(:user) { create(:user) }

  describe 'GET /api/me/session' do
    context 'have a user' do
      before do
        sign_in user
        get api_me_session_path, headers: header
      end

      it 'should status code is 200' do
        expect(response).to have_http_status(200)
      end

      it 'should response body contain id and name' do
        expect(body[:id]).to eq user.id
        expect(body[:name]).to eq user.name
      end
    end
  end
end
