class CreateMembers < ActiveRecord::Migration
  def change
    create_table :members do |t|
      t.string :name
      t.float :volunteer_hours
      t.boolean :driver

      t.timestamps null: false
    end
  end
end
