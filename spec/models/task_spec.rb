require 'rails_helper'

RSpec.describe Task, type: :model do
  describe '#done' do
    context 'タスクのメモ/アサインがない' do
      it 'タスクが存在しない' do
        expect {
          Task.find(0).done
        }.to raise_error(ActiveRecord::RecordNotFound)
      end

      it 'タスクが存在する' do
        create(:task)
        task = Task.first
        task.done
        expect(Task.find_by(task.id)).to be_nil
        expect(DoneTask.find_by(task.id)).not_to be_nil
      end
    end

    context 'タスクのメモ/アサインが存在する' do
      it 'タスクが存在する' do
        task              = build(:task)
        task.task_notes   = [build(:task_note), build(:task_note)]
        task.task_assigns = [build(:task_assign), build(:task_assign)]
        task.save!

        id      = task.id
        task.done

        expect(Task.where(id: id).empty?).to be_truthy
        expect(TaskNote.where(task_id: id).empty?).to be_truthy
        expect(TaskAssign.where(task_id: id).empty?).to be_truthy
        expect(DoneTask.where(id: id)).not_to be_nil
        expect(DoneTaskNote.where(task_id: id)).not_to be_nil
        expect(DoneTaskAssign.where(task_id: id)).not_to be_nil
      end

      it 'DoneTaskAssign実行時に例外が発生する' do
        expect(DoneTaskAssign).to \
          receive(:bulk_insert).with(any_args).and_raise('error')

        task              = build(:task)
        task.task_notes   = [build(:task_note), build(:task_note)]
        task.task_assigns = [build(:task_assign), build(:task_assign)]
        task.save!

        id      = task.id
        expect {
          task.done
        }.to raise_error('error')

        expect(Task.where(id: id).empty?).to be_falsey
        expect(TaskNote.where(task_id: id).empty?).to be_falsey
        expect(TaskAssign.where(task_id: id).empty?).to be_falsey
        expect(DoneTask.where(id: id).empty?).to be_truthy
        expect(DoneTaskNote.where(task_id: id).empty?).to be_truthy
        expect(DoneTaskAssign.where(task_id: id).empty?).to be_truthy
      end
    end
  end
end
