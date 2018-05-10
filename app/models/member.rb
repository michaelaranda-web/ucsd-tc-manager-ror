class Member < ActiveRecord::Base
  validates :name, presence: true
  
  has_many :event_attended_by_members
  has_many :attended_events, through: :event_attended_by_members, source: :event
end
