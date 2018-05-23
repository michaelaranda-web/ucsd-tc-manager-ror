class Event < ActiveRecord::Base
  validates :name, :volunteer_hours, :driving_distance, presence: true
  
  belongs_to :event_type
  has_many :event_attended_by_members, dependent: :destroy
  has_many :attendees, through: :event_attended_by_members, source: :member
  
  def self.search_by_name(search)
    where("name LIKE ?", "%#{search}%")
  end
end
