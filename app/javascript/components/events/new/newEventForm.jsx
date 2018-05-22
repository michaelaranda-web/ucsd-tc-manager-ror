import $ from 'jquery'
import React from 'react'
import MembersAutosuggest from './membersAutosuggest.jsx'
import {findWithAttr} from '../../../helpers/arrayHelpers';

export class NewEventForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: "",
      startTimeHour: 0,
      startTimeMinutes: 0,
      endTimeHour: 0,
      endTimeMinutes: 0,
      volunteerHours: 0,
      drivingDistance: 0
    }
  }
  
  componentDidMount() {
    $("form").on("keypress", function (e) {
      if (e.keyCode == 13) {
          return false;
      }
    });
  }
  
  renderDateTimeSelectors() {
    let now = new Date();
    let currYear = now.getFullYear();
    let currMonth = now.getMonth() + 1;
    let currDay = now.getDate();
    let monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let minuteLabels = ["00", "15", "30", "45"];
    
    let years = [];
    let months = [];
    let days = [];
    let start_time_hours = [];
    let start_time_minutes = [];
    let end_time_hours = [];
    let end_time_minutes = [];
    
    for(let i = 0; i < 10; i++) {
      years.push(<option key={i} value={currYear+i}>{currYear+i}</option>);
    }
    
    for(let i = 1; i <= 12; i++) {
      //Rails Date class is 1-12 for months, instead of 0-11 like in JavaScript
      months.push(<option key={i} value={i}>{monthLabels[i-1]}</option>); 
    }
    
    for(let i = 1; i <= 31; i++) {
      days.push(<option key={i} value={i}>{i}</option>);        
    }
    
    for(let i = 0; i < 24; i++) {
      start_time_hours.push(<option key={i} value={i}>{i}</option>);        
      end_time_hours.push(<option key={i} value={i}>{i}</option>);        
    }
    
    for(let i = 0; i < minuteLabels.length; i++) {
      start_time_minutes.push(<option key={i} value={i*15}>{minuteLabels[i]}</option>);        
      end_time_minutes.push(<option key={i} value={i*15}>{minuteLabels[i]}</option>);        
    }
    
    return (
      <div>
        <div className="field">
          <label htmlFor="event_date">Date</label>
          <br />
          <select id="event_date_1i" name="event[date(1i)]">
            {years}
          </select>
          <select id="event_date_2i" name="event[date(2i)]" defaultValue={currMonth}>
            {months}
          </select>
          <select id="event_date_3i" name="event[date(3i)]" defaultValue={currDay}>
            {days}
          </select>
        </div>
        <div className="field">
          <label>Start Time</label>
          <br />
          <input type="hidden" id="event_start_time_1i" name="event[start_time(1i)]" value={currYear} />
          <input type="hidden" id="event_start_time_2i" name="event[start_time(2i)]" value={currMonth} />
          <input type="hidden" id="event_start_time_3i" name="event[start_time(3i)]" value={currDay} />
          <select 
            id="event_start_time_4i" 
            name="event[start_time(4i)]" 
            value={this.state.startTimeHour}
            onChange={this.onStartTimeHourChange.bind(this)}
          >
            {start_time_hours}
          </select>
          <select 
            id="event_start_time_5i" 
            name="event[start_time(5i)]" 
            value={this.state.startTimeMinutes}
            onChange={this.onStartTimeMinutesChange.bind(this)}
          >
            {start_time_minutes}
          </select>
        </div>
        <div className="field">
          <label>End Time</label>
          <br />
          <input type="hidden" id="event_end_time_1i" name="event[end_time(1i)]" value={currYear}/>
          <input type="hidden" id="event_end_time_2i" name="event[end_time(2i)]" value={currMonth} />
          <input type="hidden" id="event_end_time_3i" name="event[end_time(3i)]" value={currDay} />
          <select 
            id="event_end_time_4i" 
            name="event[end_time(4i)]" 
            value={this.state.endTimeHour}
            onChange={this.onEndTimeHourChange.bind(this)}
          >
            {end_time_hours}
          </select>
          <select 
            id="event_end_time_5i" 
            name="event[end_time(5i)]"
            value={this.state.endTimeMinutes}
            onChange={this.onEndTimeMinutesChange.bind(this)}
          >
            {end_time_minutes}
          </select>
        </div>
      </div>
    );
  }
  
  renderEventTypeSelector() {
    return (
      <select name="event[event_type_id]" defaultValue="default" onChange={this.onEventTypeSelect.bind(this)}>
        <option disabled value="default">Select recurring event type</option>
          {
            this.props.eventTypes.map((eventType, i) => {
              return (
                <option key={i} value={eventType.id}>
                  {eventType.name}
                </option>
              )
            })
          }
      </select>
    );
  }  
  
  render() {
    return (
      <form className="add-event-form" id="new_event" action="/events" acceptCharset="UTF-8" method="post">
        <input type="hidden" name="authenticity_token" value={this.props.authenticityToken || ''} />
        <label>If submitting a recurring event, select from the following dropdown:</label>
        <br />
        {this.renderEventTypeSelector()}
        <br />
        <br />
        <div className="field">
          <label htmlFor="event_name">Name</label>
          <br />
          <input type="text" name="event[name]" id="event_name" value={this.state.name} />
        </div>
        {this.renderDateTimeSelectors()}
        <div className="field">
          <label htmlFor="event_volunteer_hours">Volunteer Hours</label>
          <br />
          <input type="text" name="event[volunteer_hours]" id="event_volunteer_hours" value={this.state.volunteerHours} />
        </div>
        <div className="field">
          <label htmlFor="event_driving_distance">Driving Distance</label>
          <br />
          <input type="text" name="event[driving_distance]" id="event_driving_distance" value={this.state.drivingDistance} />
        </div>
        <div className="field">
          <label htmlFor="event_event_summary">Event Summary</label>
          <br />
          <textarea name="event[event_summary]" id="event_event_summary"></textarea>
        </div>
        <div className="field">
          <label htmlFor="event_comments">Comments</label>
          <br />
          <textarea name="event[comments]" id="event_comments"></textarea>
        </div>
        <MembersAutosuggest members={this.props.members} />
        <input type="submit" name="commit" value="Create Event" />
      </form>
    );
  }
  
  onEventTypeSelect(e) {
    let selectedEventTypeIndex = findWithAttr(this.props.eventTypes, "id", parseInt(e.target.value));
    let selectedEventType = this.props.eventTypes[selectedEventTypeIndex];
    
    this.setState({
      name: selectedEventType.name,
      startTimeHour: selectedEventType.start_time_hour,
      startTimeMinutes: selectedEventType.start_time_minutes,
      endTimeHour: selectedEventType.end_time_hour,
      endTimeMinutes: selectedEventType.end_time_minutes,
      volunteerHours: selectedEventType.volunteer_hours,
      drivingDistance: selectedEventType.driving_distance
    })
  }
  
  onStartTimeHourChange(e) {
    this.setState({
      startTimeHour: e.target.value  
    })
  }
  
  onStartTimeMinutesChange(e) {
    this.setState({
      startTimeMinutes: e.target.value  
    })
  }
  
  onEndTimeHourChange(e) {
    this.setState({
      endTimeHour: e.target.value  
    })
  }
  
  onEndTimeMinutesChange(e) {
    this.setState({
      endTimeMinutes: e.target.value  
    })
  }
}

export default NewEventForm;