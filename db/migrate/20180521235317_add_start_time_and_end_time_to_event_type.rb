class AddStartTimeAndEndTimeToEventType < ActiveRecord::Migration
  def change
    add_column :event_types, :start_time, :time
    add_column :event_types, :end_time, :time
  end
end
