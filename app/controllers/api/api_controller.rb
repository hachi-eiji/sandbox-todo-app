class Api::ApiController < ApplicationController
  class NotFoundError < ActionController::ActionControllerError

  end

  rescue_from Exception, with: :handle_error
  rescue_from NotFoundError, with: :not_found_error

  private

  def not_found_error(e)
    @exception = e
    render 'api/errors/error', status: 404
  end

  def handle_error(e)
    @exception = e
    render 'api/errors/error', status: 500
  end
end
