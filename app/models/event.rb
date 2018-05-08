class Event < ActiveRecord::Base
  belongs_to :event_type
  has_many :attendees, class_name: "EventsAttendedByMember"
  has_many :members, through: :attendees
end
