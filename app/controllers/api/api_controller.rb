class Api::ApiController < ApplicationController
  def render_json(body)
    render :json => body, status: body['status'] || 200
  end
end
