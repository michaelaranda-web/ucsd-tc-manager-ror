class AddDefaultValueToMemberVolunteerHours < ActiveRecord::Migration
  def change
    change_column_default :members, :volunteer_hours, 0
  end
end
