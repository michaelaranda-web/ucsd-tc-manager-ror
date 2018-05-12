class EventAttendedByMember < ActiveRecord::Base
  belongs_to :member
  belongs_to :event
  
  before_destroy { |record| member.remove_volunteer_hours(event.volunteer_hours) }
end
