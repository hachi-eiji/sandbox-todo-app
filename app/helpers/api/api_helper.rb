module Api::ApiHelper
  # @return [String] token
  def token
    form_authenticity_token
  end
end
