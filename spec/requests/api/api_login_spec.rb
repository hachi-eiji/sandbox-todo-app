require 'rails_helper'

RSpec.describe 'Api::Login', type: :request do
  include RequestHelper

  describe 'POST /api/login' do
    context 'すでにアクティベート済み' do
      it 'works! (now write some real specs)' do
        u        = create(:user, email: 'test@example.com')
        u.active = true
        u.save
        params = { loginId: 'test@example.com', password: 'test' }
        post api_login_path, params: params, headers: header
        expect(response).to have_http_status 200
      end

      it 'ログインIDパスワードが正しくない' do
        create(:user, email: 'test@example.com')
        u        = User.find_by(email: 'test@example.com')
        u.active = true
        u.save
        params = { loginId: 'test@example.com', password: 'wrong' }
        post api_login_path, params: params, headers: header
        expect(response).to have_http_status 404
      end
    end

    context 'アクティベートが完了してない' do
      it 'ログインIDパスワードが正しい' do
        create(:user, email: 'test@example.com')
        params = { loginId: 'test@example.com', password: 'test' }
        post api_login_path, params: params, headers: header
        expect(response).to have_http_status 404
      end
    end
  end


  describe 'POST /api/activate' do
    context 'すでにアクティベート済み' do
      it 'ログインIDパスワードが正しい' do
        u                  = create(:user, email: 'test@example.com')
        u.activate_hash_id = 'test'
        u.active           = true
        u.save

        params = { loginId: 'test@example.com', password: 'test', code: 'test' }
        post api_activate_path, params: params, headers: header
        u.reload
        expect(response).to have_http_status 404
        expect(u.active?).to eq(true)
      end
    end

    context '未アクティベート' do
      it 'ログインIDパスワードが正しい' do
        u                  = create(:user, email: 'test@example.com')
        u.activate_hash_id = 'test'
        u.save

        params = { loginId: 'test@example.com', password: 'test', code: 'test' }
        post api_activate_path, params: params, headers: header
        u.reload
        expect(response).to have_http_status 200
        expect(u.active?).to eq(true)
      end

      it 'ログインIDパスワードが正しくない' do
        u                  = create(:user, email: 'test@example.com')
        u.activate_hash_id = 'test'
        u.save

        params = { loginId: 'test@example.com', password: 'test2', code: 'test' }
        post api_activate_path, params: params, headers: header
        expect(response).to have_http_status 404
        expect(u.active?).to eq(false)
      end

      it 'アクティベートコードが未入力' do
        u                  = create(:user, email: 'test@example.com')
        u.activate_hash_id = 'test'
        u.save

        params = { loginId: 'test@example.com', password: 'test' }
        post api_activate_path, params: params, headers: header
        expect(response).to have_http_status 404
        expect(u.active?).to eq(false)
      end
    end
  end
end
