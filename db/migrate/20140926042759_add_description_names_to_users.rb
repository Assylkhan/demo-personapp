class AddDescriptionNamesToUsers < ActiveRecord::Migration
  def change
    add_column :users, :behaviours_title, :string, default: "Behaviours"
    add_column :users, :facts_demographics_title, :string, default: "Facts & Demographics"
    add_column :users, :needs_goals_title, :string, default: "Needs & Goals"
  end
end
