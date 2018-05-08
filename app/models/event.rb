class Event < ActiveRecord::Base
  belongs_to :event_type
  has_many :event_attended_by_members
  has_many :attendees, through: :event_attended_by_members, source: :member
end
