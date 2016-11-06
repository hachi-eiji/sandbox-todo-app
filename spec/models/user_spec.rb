require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validation' do
    context 'name' do
      it 'check presence' do
        u = User.new(
          email:                 'FOO@example.com',
          password:              'test',
          password_confirmation: 'test'
        )
        expect(u.valid?).to be false
        expect(u.errors.messages[:name]).to eq(["can't be blank"])
      end
    end
    context 'email' do
      before do
        User.create!(
          name:                  'test',
          email:                 'FOO@example.com',
          password:              'test',
          password_confirmation: 'test'
        )
      end
      it 'check presence' do
        u = User.new(
          name:                  'test',
          password:              'test',
          password_confirmation: 'test'
        )
        expect(u.valid?).to be false
        expect(u.errors.messages[:email]).to eq(["can't be blank"])
      end
      it '大文字小文字区別せずユニーク制約が有効になっている' do
        user = User.new(
          name:                  'test',
          email:                 'FOO@example.com',
          password:              'test',
          password_confirmation: 'test'
        )
        expect(user.valid?).to be false
      end
      it 'emailのユニーク制約が有効' do
        user = User.new(
          name:                  'test',
          email:                 'foo@example.com',
          password:              'test',
          password_confirmation: 'test'
        )
        expect(user.valid?).to be false
      end
    end
  end
end
