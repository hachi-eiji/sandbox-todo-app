class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.references :user, index: true, foreign_key: true, null: false
      t.string :name, null: false, comment: 'プロジェクト名'
      t.timestamps null: false
    end
  end
end
