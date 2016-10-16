class CreateTaskNotes < ActiveRecord::Migration
  def change
    create_table :task_notes do |t|
      t.references :task, foreign_key: true, index: true, null: false
      t.references :user, foreign_key: true, null: false
      t.string :note, null: false, comment: 'ノート欄'
      t.timestamps null: false
    end
  end
end
