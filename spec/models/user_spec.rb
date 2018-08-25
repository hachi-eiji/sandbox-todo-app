require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validation' do
    let(:params) { {} }
    let(:user) { build(:user, params) }

    context 'name' do
      it 'check presence' do
        params.merge!(name: nil)
        expect(user.valid?).to be false
        expect(user.errors.messages[:name]).to eq(["can't be blank"])
      end
    end

    context 'email' do
      before do
        create(:user, email: 'FOO@example.com')
      end
      it 'check presence' do
        params.merge!(email: nil)
        expect(user.valid?).to be false
        expect(user.errors.messages[:email]).to eq(["can't be blank"])
      end
      it '大文字小文字区別せずユニーク制約が有効になっている' do
        params.merge!(email: 'FOO@example.com')
        expect(user.valid?).to be false
      end
      it 'emailのユニーク制約が有効' do
        params.merge!(email: 'foo@example.com')
        expect(user.valid?).to be false
      end
    end
  end

  describe 'activate' do
    context 'すでにアクティベート済' do
      let(:user) do
        create(:user, active: true)
      end

      it 'すでにアクティベート済' do
        expect(user.activate('test', 'test')).to be false
      end
    end

    context '未アクティベート' do
      before do
        # デフォルト値をセットさせたくないのでskipする
        # see https://github.com/thoughtbot/factory_girl/issues/931
        User.skip_callback(:create, :before, :initialize_activate, raise: false)
      end
      after do
        User.set_callback(:create, :before, :initialize_activate)
      end

      let(:params) { {} }
      let(:user) do
        create(:user, params)
      end
      it 'アクティベート有効期限が切れてる' do
        params.merge!(activate_expired_at: Time.new(2000, 1, 1), activate_hash_id: 'some_hash_id')
        expect(user.activate('test', 'some_hash_id')).to be false
        expect(user.active).to be false
      end
      it 'アクティベート有効期限以内だが、ハッシュIDが間違っている' do
        params.merge!(activate_expired_at: Time.current + 2.days, activate_hash_id: 'some_hash_id')
        expect(user.activate('test', 'wrong_hash_id')).to be false
        expect(user.active).to be false
      end
      it 'アクティベート有効期限いないかつ、ハッシュIDが正しい' do
        params.merge!(activate_expired_at: Time.current + 2.days, activate_hash_id: 'some_hash_id')
        expect(user.activate('test', 'some_hash_id')).to be true
        expect(user.active).to be true
      end
    end
  end
end
