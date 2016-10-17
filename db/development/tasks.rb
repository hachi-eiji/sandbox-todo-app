Project.all.each do |project|
  5.times.each do |n|
    task = project.tasks.build(
      title:       "title #{n} in project #{project.id}",
      description: "description #{n} in project #{project.id}",
      creator_id:  project.user_id,
      updater_id:  project.user_id
    )
    task.save!
  end
end
