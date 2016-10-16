class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.references :project, foreign_key: true, null: false
      t.string :title, null: false
      t.text :description
      t.integer :creator_id, null: false
      t.integer :updater_id, null: false
      t.timestamps null: false
    end
  end
end
