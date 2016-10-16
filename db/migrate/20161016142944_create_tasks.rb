class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.references :project, foreign_key: true, null: false
      t.string :title, null: false, comment: 'タイトル'
      t.text :description, comment: '詳細'
      t.integer :creator_id, null: false, comment: 'タスク作成者'
      t.integer :updater_id, null: false, comment: 'タスク更新者'
      t.timestamps null: false
    end
  end
end
