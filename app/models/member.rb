class Member < ActiveRecord::Base
  validates :name, presence: true
  
  has_many :event_attended_by_members, dependent: :destroy
  has_many :attended_events, through: :event_attended_by_members, source: :event
  
  def add_volunteer_hours(hours)
    update_attributes(volunteer_hours: self.volunteer_hours + hours)
  end
  
  def remove_volunteer_hours(hours)
    new_hours_count = [0, self.volunteer_hours - hours].max
    update_attributes(volunteer_hours: new_hours_count)
  end
end
