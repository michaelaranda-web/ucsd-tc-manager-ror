class Member < ActiveRecord::Base
  has_many :attended_events, class_name: "EventsAttendedByMember"
  has_many :events, through: :attended_events
end
