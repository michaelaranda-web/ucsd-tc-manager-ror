import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import AttendeesSelector from '../components/events/new/attendeesSelector.jsx';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <AttendeesSelector />, 
    document.querySelector('.attendees-selector'));
})