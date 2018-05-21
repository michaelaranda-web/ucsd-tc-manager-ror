import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import MembersAutosuggest from '../components/events/new/membersAutosuggest.jsx';
import NewEventPage from '../components/events/new/newEventPage.jsx';

const node = document.getElementById('events_new_data');
const authenticityToken = $('meta[name=csrf-token]').attr('content');
const members = JSON.parse(node.getAttribute('members'));
const event_types = JSON.parse(node.getAttribute('event_types'));
  
ReactDOM.render(
  <NewEventPage 
    members={members}
    eventTypes={event_types}
    authenticityToken={authenticityToken} />, 
  document.querySelector('.new-event-page-container'));
