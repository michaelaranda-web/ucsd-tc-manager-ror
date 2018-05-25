class Creators::Event 
  def create_from_post(attendees_param, event_params)
    event = ::Event.create!(event_params)
    
    attendees_param.each do |attendee_param|
      Creators::EventAttendedByMember.new.create(Member.find(attendee_param[:id]), event)
      
      if attendee_param[:drove] == "true"
        puts "*" * 80
        puts "#{Member.find(attendee_param[:id]).name} drove."
        puts "*" * 80
      end
      
      #TODO: calculate reimbursement and, for each attendee driver, send reimbursement email
    end
    
    event
  end
end