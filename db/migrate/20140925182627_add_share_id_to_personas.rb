class AddShareIdToPersonas < ActiveRecord::Migration
  def change
    add_column :personas, :share_id, :string
  end
end
