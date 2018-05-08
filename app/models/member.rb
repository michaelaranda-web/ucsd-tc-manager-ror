class Member < ActiveRecord::Base
  has_many :events_attended_by_members
  has_many :attended_events, through: :events_attended_by_members, source: :event
end
