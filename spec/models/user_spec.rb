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
end
