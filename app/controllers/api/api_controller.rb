class Api::ApiController < ApplicationController
  include ApplicationHelper

  # optionのときはCSRFTokenチェックをしない
  protect_from_forgery with: :exception, :except => [:handle_options_method]

  class NotFoundError < ActionController::ActionControllerError
  end

  rescue_from Exception, with: :handle_error
  rescue_from NotFoundError, with: :not_found_error

  after_action do
    add_response_header
  end


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
    add_response_header
    render 'api/errors/error', status: 404
  end

  def handle_error(e)
    @exception = e
    add_response_header
    render 'api/errors/error', status: 500
  end

  def add_response_header
    # cros対応
    if request.fullpath.starts_with?('/api') || request.headers['Content-Type'] == 'application/json'
      header           = {
        'Content-Type'                     => 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin'      => "#{request.headers['HTTP_ORIGIN']}",
        'Access-Control-Allow-Credentials' => 'true',
        'Access-Control-Allow-Headers'     => 'X-PINGOTHER, Content-Type, x-csrf-token, Accept',
        'Access-Control-Allow-Methods'     => 'GET, POST, DELETE, OPTIONS, PUT'
      }
      response.headers = response.headers.merge(header)
    end
  end
end
