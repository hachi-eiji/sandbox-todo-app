require 'rails_helper'

RSpec.describe "Api::Users::Mes", type: :request do
  describe "GET /api_users_mes" do
    it "works! (now write some real specs)" do
      get api_users_mes_path
      expect(response).to have_http_status(200)
    end
  end
end
