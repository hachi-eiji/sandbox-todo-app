class CreateProjectMembers < ActiveRecord::Migration
  def change
    create_table :project_members do |t|
      t.references :project, foreign_key: true, index: true, null: false
      t.references :user, foreign_key: true, index: true, null: false
      t.timestamps null: false
    end
  end
end
