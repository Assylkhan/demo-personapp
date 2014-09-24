class CreatePersonas < ActiveRecord::Migration
  def change
    create_table :personas do |t|
      t.integer :project_id
      t.string :name
      t.string :post
      t.string :image
      t.text :behaviours, array: true, default: []
      t.text :facts_demographics, array: true, default: []
      t.text :needs_goals, array: true, default: []
      t.timestamps
    end
  end
end
