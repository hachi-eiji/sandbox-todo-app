require 'rails_helper'

RSpec.describe Project, type: :model do
  describe '#personal' do
    let(:user) { create(:user) }
    let!(:project) { create(:project, user: user) }

    context '個人の情報が取得できる場合' do
      it 'その人の情報を返す' do
        projects = Project.personal(user.id)
        expect(projects.id).to eq project.id
      end
    end
  end
end
