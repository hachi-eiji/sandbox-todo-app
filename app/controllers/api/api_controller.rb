class Api::ApiController < ApplicationController
  include Api::ApiHelper

  class NotFoundError < ActionController::ActionControllerError
  end

  rescue_from Exception, with: :handle_error
  rescue_from NotFoundError, with: :not_found_error

  # optionsメソッドが飛んできたのときの処理
  def handle_options_method
    render :nothing => true, status: 200
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  private

  def not_found_error(e)
    @exception = e
    render 'api/errors/error', status: 404
  end

  def handle_error(e)
    @exception = e
    logger.error(e)
    render 'api/errors/error', status: 500
  end
end
