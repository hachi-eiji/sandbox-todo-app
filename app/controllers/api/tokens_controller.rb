class Api::TokensController < Api::ApiController
  def index
    render :json => { token: token }, status: 200
  end
end
