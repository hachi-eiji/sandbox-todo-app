require 'rails_helper'

RSpec.describe "Api::Logins", type: :request do
  describe "GET /api_logins" do
    it "works! (now write some real specs)" do
      get api_logins_path
      expect(response).to have_http_status(200)
    end
  end
end
