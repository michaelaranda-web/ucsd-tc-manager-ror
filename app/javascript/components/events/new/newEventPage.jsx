import $ from 'jquery'
import React from 'react'
import NewEventForm from './newEventForm.jsx'

export class NewEventPage extends React.Component {
  render() {
    return (
      <div className="new-event-page">
        <NewEventForm 
          authenticityToken={this.props.authenticityToken}
          members={this.props.members}
          eventTypes={this.props.eventTypes}
        />
      </div>
    );
  }
}

export default NewEventPage;