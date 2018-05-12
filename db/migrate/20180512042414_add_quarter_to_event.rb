class AddQuarterToEvent < ActiveRecord::Migration
  def change
    add_column :events, :quarter, :string
  end
end
