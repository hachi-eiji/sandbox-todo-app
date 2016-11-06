FactoryGirl.define do
  factory :task do
    title 'task_title'
    description 'task_description'
    project
    creator_id { User.first.id }
    updater_id { User.first.id }
  end
end
