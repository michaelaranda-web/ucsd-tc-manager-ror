import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import AttendeesSelector from '../components/events/new/attendeesSelector.jsx';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('members_data')
  const members = JSON.parse(node.getAttribute('members'))
  
  ReactDOM.render(
    <AttendeesSelector members={members}/>, 
    document.querySelector('.attendees-selector-container'));
})