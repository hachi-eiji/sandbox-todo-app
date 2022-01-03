# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 0) do

  create_table "done_task_assigns", id: :integer, default: 0, charset: "utf8mb4", force: :cascade do |t|
    t.bigint "task_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "done_task_notes", id: :integer, default: 0, charset: "utf8mb4", force: :cascade do |t|
    t.bigint "task_id", null: false
    t.bigint "user_id", null: false
    t.string "note", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "done_tasks", id: :integer, default: 0, charset: "utf8mb4", force: :cascade do |t|
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

  create_table "project_members", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_project_members_on_project_id"
    t.index ["user_id"], name: "index_project_members_on_user_id"
  end

  create_table "projects", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_projects_on_user_id"
  end

  create_table "task_assigns", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "task_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["task_id"], name: "index_task_assigns_on_task_id"
    t.index ["user_id"], name: "index_task_assigns_on_user_id"
  end

  create_table "task_notes", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "task_id", null: false
    t.bigint "user_id", null: false
    t.string "note", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["task_id"], name: "index_task_notes_on_task_id"
    t.index ["user_id"], name: "index_task_notes_on_user_id"
  end

  create_table "tasks", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.string "title", null: false
    t.text "description"
    t.datetime "due_date"
    t.bigint "creator_id", null: false
    t.bigint "updater_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_creator_id_on_tasks"
    t.index ["project_id"], name: "index_project_id_on_tasks"
  end

  create_table "users", charset: "utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.boolean "active", default: false, null: false
    t.string "activate_hash_id", null: false
    t.datetime "activate_expired_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "project_members", "projects", name: "fk_project_members_projects"
  add_foreign_key "project_members", "users", name: "fk_project_members_users"
  add_foreign_key "projects", "users", name: "projects_users"
  add_foreign_key "task_assigns", "tasks", name: "task_assigns_tasks"
  add_foreign_key "task_assigns", "users", name: "task_assigns_users"
  add_foreign_key "task_notes", "tasks", name: "task_notes_tasks"
  add_foreign_key "task_notes", "users", name: "task_notes_users"
  add_foreign_key "tasks", "projects", name: "tasks_projects"
end
