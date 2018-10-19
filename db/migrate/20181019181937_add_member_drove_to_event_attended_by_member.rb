class AddMemberDroveToEventAttendedByMember < ActiveRecord::Migration
  def change
    add_column :event_attended_by_members, :member_drove, :boolean, default: false
  end
end
