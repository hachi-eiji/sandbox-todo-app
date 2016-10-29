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

    # webpack-dev-serverからアクセスしてくるためCROS対応
    header = {
      'Content-Type'                     => 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin'      => 'http://localhost:3001',
      'Access-Control-Allow-Credentials' => 'true',
      'Access-Control-Allow-Headers'     => 'X-PINGOTHER, Content-Type',
      'Access-Control-Allow-Methods'     => 'GET, POST, DELETE, OPTIONS, PUT'
    }

    method = env['REQUEST_METHOD']
    if method == 'GET'
      path = "./data/#{match[1]}.json.erb"

      # CROSの場合は最初に確認通信が来るので返す
    elsif method == 'OPTIONS'
      return [200, header, [{}.to_json]]
    else
      path = "./data/#{match[1]}_#{method.downcase}.json.erb"
    end

    unless File.exist?(path)
      puts "#{path} not found"
      return [404, header, [{}.to_json]]
    end
    File.open(path) do |file|
      erb          = ERB.new(File.read(path))
      erb.filename = path
      body         = erb.result(binding)
      obj          = JSON.parse(body)
      [obj['status'] || 200, header, [body]]
    end
  end
end
