tables = %w(
  users
  projects
  tasks
)

tables.each do |table|
  path = Rails.root.join('db', Rails.env, "#{table}.rb")
  require(path) if File.exist?(path)
end
