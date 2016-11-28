require 'rails_helper'

describe TaskService do
  describe '#done' do
    context 'タスクのメモ/アサインがない' do
      it 'タスクが存在しない' do
        service = TaskService.new
        expect {
          service.done(0)
        }.to raise_error(ActiveRecord::RecordNotFound)
      end

      it 'タスクが存在する' do
        create(:task)
        service = TaskService.new
        id      = Task.first.id
        service.done(id)
        expect(Task.find_by(id)).to be_nil
        expect(DoneTask.find_by(id)).not_to be_nil
      end
    end

    context 'タスクのメモ/アサインが存在する' do
      it 'タスクが存在する' do
        task              = build(:task)
        task.task_notes   = [build(:task_note), build(:task_note)]
        task.task_assigns = [build(:task_assign), build(:task_assign)]
        task.save!

        id      = task.id
        service = TaskService.new
        service.done(id)

        expect(Task.where(id: id).empty?).to be_truthy
        expect(TaskNote.where(task_id: id).empty?).to be_truthy
        expect(TaskAssign.where(task_id: id).empty?).to be_truthy
        expect(DoneTask.where(id: id)).not_to be_nil
        expect(DoneTaskNote.where(task_id: id)).not_to be_nil
        expect(DoneTaskAssign.where(task_id: id)).not_to be_nil
      end

      it 'DoneTaskAssign実行時に例外が発生する' do
        expect(DoneTaskAssign).to \
          receive(:create!).with(any_args).and_raise('error')

        task              = build(:task)
        task.task_notes   = [build(:task_note), build(:task_note)]
        task.task_assigns = [build(:task_assign), build(:task_assign)]
        task.save!

        id      = task.id
        service = TaskService.new
        expect {
          service.done(id)
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
