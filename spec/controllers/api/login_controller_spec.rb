require 'rails_helper'

describe Api::LoginController, :type => :controller do
  describe 'POST #show' do
    context 'すでにアクティベート済み' do
      it 'ログインIDパスワードが正しい' do
        u        = create(:user, email: 'test@example.com')
        u.active = true
        u.save
        params = { loginId: 'test@example.com', password: 'test' }
        post :show, params: params, format: :jbuilder
        expect(response.status).to eq(200)
      end


      it 'ログインIDパスワードが正しくない' do
        create(:user, email: 'test@example.com')
        u        = User.find_by(email: 'test@example.com')
        u.active = true
        u.save
        params = { loginId: 'test@example.com', password: 'wrong' }
        post :show, params: params, format: :jbuilder
        expect(response.status).to eq(404)
      end
    end

    context 'アクティベートが完了してない' do
      it 'ログインIDパスワードが正しい' do
        create(:user, email: 'test@example.com')
        params = { loginId: 'test@example.com', password: 'test' }
        post :show, params: params, format: :jbuilder
        expect(response.status).to eq(404)
      end
    end
  end


  describe 'POST #activate' do
    context 'すでにアクティベート済み' do
      it 'ログインIDパスワードが正しい' do
        u                  = create(:user, email: 'test@example.com')
        u.activate_hash_id = 'test'
        u.active           = true
        u.save

        params = { loginId: 'test@example.com', password: 'test', code: 'test' }
        post :activate, params: params, format: :jbuilder
        u.reload
        expect(response.status).to eq(404)
        expect(u.active?).to eq(true)
      end
    end


    context '未アクティベート' do
      it 'ログインIDパスワードが正しい' do
        u                  = create(:user, email: 'test@example.com')
        u.activate_hash_id = 'test'
        u.save

        params = { loginId: 'test@example.com', password: 'test', code: 'test' }
        post :activate, params: params, format: :jbuilder
        u.reload
        expect(response.status).to eq(200)
        expect(u.active?).to eq(true)
      end


      it 'ログインIDパスワードが正しくない' do
        u                  = create(:user, email: 'test@example.com')
        u.activate_hash_id = 'test'
        u.save

        params = { loginId: 'test@example.com', password: 'test2', code: 'test' }
        post :activate, params: params, format: :jbuilder
        expect(response.status).to eq(404)
        expect(u.active?).to eq(false)
      end


      it 'アクティベートコードが未入力' do
        u                  = create(:user, email: 'test@example.com')
        u.activate_hash_id = 'test'
        u.save

        params = { loginId: 'test@example.com', password: 'test' }
        post :activate, params: params, format: :jbuilder
        expect(response.status).to eq(404)
        expect(u.active?).to eq(false)
      end
    end
  end
end
