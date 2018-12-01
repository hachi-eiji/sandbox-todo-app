FactoryBot.define do
  factory :task_note do
    task
    user_id { User.first.id }
    note { 'test_note' }
  end
end
