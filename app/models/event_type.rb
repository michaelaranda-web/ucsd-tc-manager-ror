class EventType < ActiveRecord::Base
  validates :name, :volunteer_hours, :driving_distance, presence: true
end
