create_table "done_tasks", id: :integer, default: 0, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
  t.bigint "project_id", null: false
  t.string "title", null: false
  t.text "description"
  t.datetime "due_date"
  t.integer "creator_id", null: false
  t.integer "updater_id", null: false
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false
  t.index ["creator_id"], name: "index_creator_id_on_done_tasks"
  t.index ["project_id"], name: "index_project_id_on_done_tasks"
end
