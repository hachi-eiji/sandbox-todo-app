require 'rails_helper'

RSpec.describe Task, type: :model do
  describe 'due_date' do
    context 'validation' do
      it 'error occurred when set past due_date' do
        task = build(:task, due_date: Time.now - 1.days)
        expect(task.valid?).to be false
        expect(task.errors.messages[:due_date]).to include("can't include past date")
      end
    end
  end
end
