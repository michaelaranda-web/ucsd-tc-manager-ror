class Creators::Event 
  def create_from_post(attendees_param, event_params)
    event = ::Event.create!(event_params)
    
    attendees_param.each do |attendee_param|
      conditions = {
        drove: attendee_param[:drove] == "true"
      }
      
      Creators::EventAttendedByMember.new.create(Member.find(attendee_param[:id]), event, conditions)
      
      #TODO: calculate reimbursement and, for each attendee driver, send reimbursement email
    end
    
    event
  end
end