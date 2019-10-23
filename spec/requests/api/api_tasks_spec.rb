require 'rails_helper'

RSpec.describe 'Api::Tasks', type: :request do
  include RequestHelper

  describe 'PUT /api/tasks/:id' do
    context 'doneのフラグ送られてない' do
      it 'タイトル更新' do
        task = create(:task)

        params = { title: 'updated title' }
        put tasks_url(task.id), params: params, headers: header

        task.reload

        expect(response).to have_http_status 200
        expect(task.title).to eq(params[:title])
      end

      it 'タスク期限更新' do
        task = create(:task)

        params = { due_date: '2100-01-02' }
        put tasks_url(task.id), params: params, headers: header

        task.reload

        expect(response).to have_http_status 200
        expect(task.due_date.strftime('%Y-%m-%d')).to eq(params[:due_date])
      end
    end

    context '完了フラグ更新' do
      it '完了フラグ更新' do
        task = create(:task)

        params = { done: true }
        put tasks_url(task.id), params: params, headers: header

        expect(response).to have_http_status 200
        expect(Task.find_by(id: task.id)).to be nil
      end
    end
  end

  describe 'DELETE /api/tasks/:id' do
    it 'タスクを削除する' do
      user    = create(:user)
      project = create(:project, user: user)
      task    = create(:task, project: project)
      create(:project_member, project: project, user: user)

      sign_in user
      delete tasks_url(task.id), headers: header

      expect(response).to have_http_status 200
      expect(Task.find_by(id: task.id)).to be nil
    end

    it '自分が入っていないプロジェクトのタスクは削除できない' do
      user    = create(:user)
      project = create(:project, user: user)
      task    = create(:task, project: project)

      sign_in user
      delete tasks_url(task.id), headers: header

      expect(response).to have_http_status 404
    end
  end

  describe 'POST /api/tasks' do
    let(:user) { create(:user) }
    let(:project) { create(:project, user: user) }

    before do
      sign_in user
      create(:project_member, project: project, user: user)
    end

    context 'タイトルが未入力の場合' do
      it '作成エラーになる' do
        params = { title: '', due_date: '2017-01-12 12:34:56' }
        post api_tasks_path, params: params, headers: header
        expect(response).to have_http_status 500
      end

      it '最大長エラーになる' do
        params = { title: '1' * 101, due_date: '2017-01-12 12:34:56' }
        post api_tasks_path, params: params, headers: header
        expect(response).to have_http_status 500
      end
    end

    context 'タイトル,日付ともに入力しているとき' do
      it 'データが作成される' do
        params = { title: 'テスト', due_date: '2017-01-12 12:34:56' }
        post api_tasks_path, params: params, headers: header
        task = Task.first
        expect(task.title).to eq('テスト')
        expect(task.due_date.strftime('%Y-%m-%d %H:%M:%S')).to eq('2017-01-12 12:34:56')
        expect(task.creator_id).to eq(user.id)
        expect(task.updater_id).to eq(user.id)
        expect(response).to have_http_status 200
      end
    end
  end

  private

  def tasks_url(id)
    api_tasks_path + "/#{id}"
  end
end
