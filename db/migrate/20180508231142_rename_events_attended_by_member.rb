class RenameEventsAttendedByMember < ActiveRecord::Migration
  def self.up
    rename_table :events_attended_by_members, :event_attended_by_members
  end

  def self.down
    rename_table :event_attended_by_members, :events_attended_by_members
  end
end
