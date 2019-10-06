FactoryBot.define do
  factory :task do
    title { 'task_title' }
    description { 'task_description' }
    project
    creator_id { create(:user).id }
    updater_id { create(:user).id }
  end
end
