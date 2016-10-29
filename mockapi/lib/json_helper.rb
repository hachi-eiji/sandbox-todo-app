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


    if env['REQUEST_PATH'] == 'GET'
      path = "./data/#{match[1]}.json.erb"
    else
      path = "./data/#{match[1]}_post.json.erb"
    end

    # webpack-dev-serverからアクセスしてくるためCROS対応
    header = {
      'Content-Type'                     => 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin'      => 'http://localhost:3001',
      'Access-Control-Allow-Credentials' => 'true',
      'Access-Control-Allow-Headers'     => 'X-PINGOTHER, Content-Type'
    }
    unless File.exist?(path)
      puts "#{path} not found"
      return [404, header, [{}.to_json]]
    end
    File.open(path) do |file|
      erb          = ERB.new(File.read(path))
      erb.filename = path
      [200, header, [erb.result(binding)]]
    end
  end
end
