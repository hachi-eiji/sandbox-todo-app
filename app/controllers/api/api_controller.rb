class Api::ApiController < ApplicationController
  class NotFoundError < ActionController::ActionControllerError
  end

  rescue_from Exception, with: :handle_error
  rescue_from NotFoundError, with: :not_found_error

  after_action do
    # cros対応
    if request.fullpath.starts_with?('/api') || request.headers['Content-Type'] == 'application/json'
      header           = {
        'Content-Type'                     => 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin'      => "#{request.headers['HTTP_ORIGIN']}",
        'Access-Control-Allow-Credentials' => 'true',
        'Access-Control-Allow-Headers'     => 'X-PINGOTHER, Content-Type',
        'Access-Control-Allow-Methods'     => 'GET, POST, DELETE, OPTIONS, PUT'
      }
      response.headers = response.headers.merge(header)
    end
  end


  # optionsメソッドが飛んできたのときの処理
  def handle_options_method
    render :nothing => true, status: 200
  end

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
