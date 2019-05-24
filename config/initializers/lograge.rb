Rails.application.configure do
  config.lograge.enabled = true
  config.lograge.base_controller_class = 'ActionController::API'
  config.lograge.formatter = Lograge::Formatters::Json.new
  config.lograge.custom_options = lambda do |event|
    exceptions = %w(controller action format authenticity_token)
    {
      host: event.payload[:host],
      timestamp: Time.zone.now,
      params: event.payload[:params].except(*exceptions),
      exception: event.payload[:exception],
      exception_object: event.payload[:exception_object],
    }
  end
end
