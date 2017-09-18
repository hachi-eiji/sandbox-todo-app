require 'rails_helper'

describe Api::TasksController do
  describe 'PUT #update' do
    context 'doneのフラグ送られてない' do
      it 'タイトル更新' do
        task = create(:task)

        params = { id: task.id, title: 'updated title' }
        put :update, params: params, format: :jbuilder

        task.reload

        expect(response.status).to eq(200)
        expect(task.title).to eq(params[:title])
      end

      it 'タスク期限更新' do
        task = create(:task)

        params = { id: task.id, due_date: '2100-01-02' }
        put :update, params: params, format: :jbuilder

        task.reload

        expect(response.status).to eq(200)
        expect(task.due_date.strftime('%Y-%m-%d')).to eq(params[:due_date])
      end
    end

    context '完了フラグ更新' do
      it '完了フラグ更新' do
        task = create(:task)

        put :update, params: { id: task.id, done: true }, format: :jbuilder

        expect(response.status).to eq(200)
        expect(Task.find_by(id: task.id)).to be nil
      end
    end
  end

  describe 'DELETE' do
    context 'destroy' do
      it 'タスクを削除する' do
        user = create(:user)
        session[:user_id] = user.id
        project = create(:project, user: user)
        task = create(:task, project: project)
        create(:project_member, project: project, user: user)

        delete :destroy, params: {id: task.id}, format: :jbuilder

        expect(response.status).to eq(200)
        expect(Task.find_by(id: task.id)).to be nil
      end

      it '自分が入っていないプロジェクトのタスクは削除できない' do
        user = create(:user)
        session[:user_id] = user.id
        project = create(:project, user: user)
        task = create(:task, project: project)

        delete :destroy, params: {id: task.id}, format: :jbuilder

        expect(response.status).to eq(404)
      end
    end
  end

  describe 'POST #create' do
    let (:user) {create(:user)}
    let (:project) {create(:project, user: user)}
    before do
      session[:user_id] = user.id
      create(:project_member, project: project, user: user)
    end

    context 'タイトルが未入力の場合' do
      it '作成エラーになる' do
        post :create, params: { title: '', due_date: '2017-01-12 12:34:56' }, format: :jbuilder
        expect(response.status).to eq(500)
      end
    end

    context 'タイトルが100文字以上の場合' do
      it '最大長エラーになる' do
        post :create, params: { title: '1'*101, due_date: '2017-01-12 12:34:56' }, format: :jbuilder
        expect(response.status).to eq(500)
      end
    end

    context 'タイトル,日付ともに入力しているとき' do
      it 'データが作成される' do
        post :create, params: { title: 'テスト', due_date: '2017-01-12 12:34:56' }, format: :jbuilder
        task = Task.first
        expect(task.title).to eq('テスト')
        expect(task.due_date).to eq('2017-01-12 12:34:56')
        expect(task.creator_id).to eq(user.id)
        expect(task.updater_id).to eq(user.id)
        expect(response.status).to eq(200)
      end
    end
  end
end
