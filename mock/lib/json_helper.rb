require 'json'

class JsonHelper
  def initialize(app)
    @app = app
  end

  # /api以下にアクセスするとレスポンスヘッダを書き換え
  def call(env)
    unless (match = %r(\A/api/(.*)\Z).match(env['REQUEST_PATH']))
      return @app.call(env)
    end

    path = "./data/#{match[1]}.json"
    unless File.exist?(path)
      puts "#{path} not found"
      return [404, { 'Content-Type' => 'application/json' }, [{}.to_json]]
    end
    File.open(path) do |file|
      [200, { 'Content-Type' => 'application/json' }, [JSON.load(file).to_json]]
    end
  end
end
