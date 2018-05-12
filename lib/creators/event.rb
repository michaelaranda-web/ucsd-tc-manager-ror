class Creators::Event 
  def create_from_post(attendee_ids=[], event_params)
    event = ::Event.create(event_params)
    
    attendee_ids.each do |attendee_id|
      Creators::EventAttendedByMember.new.create(Member.find(attendee_id), event)
    end
    
    event
  end
end