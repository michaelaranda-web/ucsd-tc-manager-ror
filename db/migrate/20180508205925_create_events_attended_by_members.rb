class CreateEventsAttendedByMembers < ActiveRecord::Migration
  def change
    create_table :events_attended_by_members do |t|
      t.integer :event_id
      t.integer :member_id

      t.timestamps null: false
    end
  end
end
