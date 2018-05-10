import React from 'react'
import Autosuggest from 'react-autosuggest';
import { findWithAttr } from '../../../helpers/arrayHelpers';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, members, selectedMembers) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  let suggestions = members.filter(member => regex.test(member.name));
  let remainingSuggestions = suggestions.filter(member => findWithAttr(selectedMembers, "name", member.name) === -1 );
  return remainingSuggestions;
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

export class MembersAutosuggest extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      selectedMembers: []
    };    
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.members, this.state.selectedMembers)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  
  onSuggestionSelectedCustom = (suggestion, suggestionValue, suggestionIndex, sectionIndex, method) => {
    this.setState({
      selectedMembers: [...this.state.selectedMembers, suggestionValue.suggestion],
      value: ''
    });
  };
  
  renderSelectedMembers() {
    return this.state.selectedMembers.map((member, i) => {
      return (
        <div key={i}>
          {member.name}
          <input className="hidden" name={`attendees[]`} value={member.id} />
        </div>
      );
    })
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Enter attendees",
      value,
      onChange: this.onChange.bind(this)
    };

    return (
      <div>
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
          onSuggestionSelected={this.onSuggestionSelectedCustom.bind(this)}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />
        { this.renderSelectedMembers() }
      </div>
    );
  }
}

export default MembersAutosuggest;