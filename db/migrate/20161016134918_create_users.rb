class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name, null: false, comment: '名前'
      t.string :email, null: false, comment: 'メールアドレス'
      t.string :password_digest, null: false, comment: 'パスワード'
      t.boolean :active, null: false, default: false
      t.timestamps null: false
    end
  end
end
