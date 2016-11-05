class Api::TokensController < Api::ApiController
  def index
    render :json => { token: form_authenticity_token }, status: 200
  end
end
