FactoryBot.define do
  factory :task do
    title { 'task_title' }
    description { 'task_description' }
    project { create(:project, user: create(:user)) }
    creator_id { create(:user).id }
    updater_id { create(:user).id }
  end
end
