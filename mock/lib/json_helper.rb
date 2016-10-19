require 'json'
require 'erb'

class JsonHelper
  def initialize(app)
    @app = app
  end

  # /api以下にアクセスするとレスポンスヘッダを書き換え
  def call(env)
    unless (match = %r(\A/api/(.*)\Z).match(env['REQUEST_PATH']))
      return @app.call(env)
    end

    path = "./data/#{match[1]}.json.erb"
    unless File.exist?(path)
      puts "#{path} not found"
      return [404, { 'Content-Type' => 'application/json;charset=UTF-8' }, [{}.to_json]]
    end
    File.open(path) do |file|
      erb = ERB.new(File.read(path))
      erb.filename = path
      [200, { 'Content-Type' => 'application/json;charset=UTF-8' }, [erb.result(binding)]]
    end
  end
end
