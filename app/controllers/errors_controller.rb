class ErrorsController < Api::ApiController
  def index
    if request.fullpath.starts_with?('/api') || request.headers['Content-Type'] == 'application/json'
      raise NotFoundError, 'API is not found'
    end
  end

  def not_found
    render 'errors/not_found', status: 404
  end
end
