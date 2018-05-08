class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name
      t.date :date
      t.text :event_summary
      t.text :comments
      t.float :volunteer_hours
      t.float :driving_distance
      t.time :start_time
      t.time :end_time

      t.timestamps null: false
    end
  end
end
