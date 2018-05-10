class AddDefaultValuesForAllModels < ActiveRecord::Migration
  def change
    change_column_default :members, :driver, false
    change_column_default :events, :volunteer_hours, 0
    change_column_default :events, :driving_distance, 0
    change_column_default :event_types, :volunteer_hours, 0
    change_column_default :event_types, :driving_distance, 0
  end
end
