class CreateTaskAssigns < ActiveRecord::Migration
  def change
    create_table :task_assigns do |t|
      t.references :task, foreign_key: true, null: false
      t.references :user, foreign_key: true, null: false
      t.timestamps null: false
    end
  end
end
