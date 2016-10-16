# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161016144351) do

  create_table "project_members", force: :cascade do |t|
    t.integer  "project_id", limit: 4, null: false
    t.integer  "user_id",    limit: 4, null: false
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  add_index "project_members", ["project_id"], name: "index_project_members_on_project_id", using: :btree
  add_index "project_members", ["user_id"], name: "index_project_members_on_user_id", using: :btree

  create_table "projects", force: :cascade do |t|
    t.integer  "user_id",    limit: 4,   null: false
    t.string   "name",       limit: 255, null: false, comment: "プロジェクト名"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "projects", ["user_id"], name: "index_projects_on_user_id", using: :btree

  create_table "task_assigns", force: :cascade do |t|
    t.integer  "task_id",    limit: 4, null: false
    t.integer  "user_id",    limit: 4, null: false
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  add_index "task_assigns", ["task_id"], name: "fk_rails_1a05af1f6d", using: :btree
  add_index "task_assigns", ["user_id"], name: "fk_rails_3fa86f79ee", using: :btree

  create_table "task_notes", force: :cascade do |t|
    t.integer  "task_id",    limit: 4,   null: false
    t.integer  "user_id",    limit: 4,   null: false
    t.string   "note",       limit: 255, null: false, comment: "ノート欄"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "task_notes", ["task_id"], name: "index_task_notes_on_task_id", using: :btree
  add_index "task_notes", ["user_id"], name: "fk_rails_e8d7b2a72f", using: :btree

  create_table "tasks", force: :cascade do |t|
    t.integer  "project_id",  limit: 4,     null: false
    t.string   "title",       limit: 255,   null: false, comment: "タイトル"
    t.text     "description", limit: 65535,              comment: "詳細"
    t.integer  "creator_id",  limit: 4,     null: false, comment: "タスク作成者"
    t.integer  "updater_id",  limit: 4,     null: false, comment: "タスク更新者"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  add_index "tasks", ["project_id"], name: "fk_rails_02e851e3b7", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",            limit: 255,                 null: false, comment: "名前"
    t.string   "email",           limit: 255,                 null: false, comment: "メールアドレス"
    t.string   "password_digest", limit: 255,                 null: false, comment: "パスワード"
    t.boolean  "active",                      default: false, null: false
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

  add_foreign_key "project_members", "projects"
  add_foreign_key "project_members", "users"
  add_foreign_key "projects", "users"
  add_foreign_key "task_assigns", "tasks"
  add_foreign_key "task_assigns", "users"
  add_foreign_key "task_notes", "tasks"
  add_foreign_key "task_notes", "users"
  add_foreign_key "tasks", "projects"
end
