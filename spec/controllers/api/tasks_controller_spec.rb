require 'rails_helper'

describe Api::TasksController do
  describe 'PUT #update' do
    context 'doneのフラグ送られてない' do
      it 'タイトル更新' do
        task = create(:task)

        params = {title: 'updated title'}
        put :update, id: task.id, task: params, format: :jbuilder

        task.reload

        expect(response.status).to eq(200)
        expect(task.title).to eq(params[:title])
      end

      it 'タスク期限更新' do
        task = create(:task)

        params = {due_date: '2100-01-02'}
        put :update, id: task.id, task: params ,format: :jbuilder

        task.reload

        expect(response.status).to eq(200)
        expect(task.due_date.strftime('%Y-%m-%d')).to eq(params[:due_date])
      end
    end

    context '完了フラグ更新' do
      it '完了フラグ更新' do
        task = create(:task)

        params = {done: true}
        put :update, id: task.id, task: params ,format: :jbuilder

        expect(response.status).to eq(200)
        expect(Task.find_by(id: task.id)).to be nil
      end
    end
  end

  describe 'DELETE' do
    context 'destroy' do
      it 'タスクを削除する' do
        task = create(:task)

        delete :destroy, id: task.id, format: :jbuilder

        expect(response.status).to eq(200)
        expect(Task.find_by(id: task.id)).to be nil
      end
    end
  end
end
