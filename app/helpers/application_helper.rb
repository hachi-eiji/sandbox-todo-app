module ApplicationHelper
  # @return [String] token
  def token
    form_authenticity_token
  end
end
