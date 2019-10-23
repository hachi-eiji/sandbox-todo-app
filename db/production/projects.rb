# ユーザごとに複数個作る
User.all.each do |user|
  5.times do |n|
    user.projects.create!(name: "project #{user.id} no. #{n}", user: user)
  end
end
