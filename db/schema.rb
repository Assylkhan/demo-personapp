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

ActiveRecord::Schema.define(version: 20140926042759) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "personas", force: true do |t|
    t.integer  "project_id"
    t.string   "name"
    t.string   "post"
    t.string   "image"
    t.text     "behaviours",         default: [], array: true
    t.text     "facts_demographics", default: [], array: true
    t.text     "needs_goals",        default: [], array: true
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "share_id"
  end

  create_table "projects", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  create_table "users", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "password_digest"
    t.string   "remember_token"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "behaviours_title",         default: "Behaviours"
    t.string   "facts_demographics_title", default: "Facts & Demographics"
    t.string   "needs_goals_title",        default: "Needs & Goals"
  end

end
