class Creators::EventAttendedByMember 
  def create(member, event, conditions)
    event_attended = ::EventAttendedByMember.create!(member_id: member.id, event_id: event.id)
    
    if conditions[:drove]
      puts "*" * 80
      puts "#{member.name} drove."
      puts "*" * 80
      
      event_attended.update_attributes!(member_drove: true)
    end
    
    member.add_volunteer_hours(event.volunteer_hours)
    
    event_attended
  end
end