class ErrorsController < Api::ApiController
  def index
    if request.fullpath.starts_with?('/api') || request.headers['Content-Type'] == 'application/json'
      raise NotFoundError, 'API is not found'
    end
    # TODO(hachi-eiji): あとできちんとつくること
  end
end
