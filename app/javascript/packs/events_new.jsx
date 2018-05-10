import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import MembersAutosuggest from '../components/events/new/membersAutosuggest.jsx';

const node = document.getElementById('members_data')
const members = JSON.parse(node.getAttribute('members'))

ReactDOM.render(
  <MembersAutosuggest members={members}/>, 
  document.querySelector('.attendees-selector-container'));
