class Creators::EventAttendedByMember 
  def create(member, event)
    event_attended = ::EventAttendedByMember.create!(member_id: member.id, event_id: event.id)
    
    member.add_volunteer_hours(event.volunteer_hours)
    
    event_attended
  end
end