json.status response.status
json.data @tasks do |task|
  json.id task.id
  json.title task.title
  json.description task.description
  json.due_date task.due_date.strftime('%Y-%m-%d')
end
