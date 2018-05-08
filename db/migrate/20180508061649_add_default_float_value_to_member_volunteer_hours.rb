class AddDefaultFloatValueToMemberVolunteerHours < ActiveRecord::Migration
  def change
    change_column_default :members, :volunteer_hours, 0.0
  end
end
