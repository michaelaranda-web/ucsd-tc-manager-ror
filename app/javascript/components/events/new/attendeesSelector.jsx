import React from 'react';
import Autosuggest from 'react-autosuggest';

export class AttendeesSelector extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      value: '',
      suggestions: [],
      selectedMembers: []
    };
  }
  
  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : this.props.members.filter(member =>
      member.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };
  
  getSuggestionValue(member) {
    return '';
  }
  
  renderSuggestion(member) {
    return (
      <div>
        {member.name}
      </div>
    );
  }
  
  onAutosuggestChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };
  
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  
  onSuggestionSelectedCustom = (suggestion, suggestionValue, suggestionIndex, sectionIndex, method) => {
    this.setState({
      selectedMembers: [...this.state.selectedMembers, suggestionValue.suggestion.id]
    });
  };
  
  renderSelectedMembers() {
    return this.state.selectedMembers.map((member, i) => {
      return <div key={i}>{member}</div>
    })
  }
  
  render() {
    const value = this.state.value;
    
    const inputProps = {
      placeholder: 'Enter attendees',
      value,
      onChange: this.onAutosuggestChange.bind(this)
    };
    
    return (
      <div className="attendees-selector">
        <Autosuggest 
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
          getSuggestionValue={this.getSuggestionValue.bind(this)}
          renderSuggestion={this.renderSuggestion.bind(this)}
          onSuggestionSelected={this.onSuggestionSelectedCustom.bind(this)}
          inputProps={inputProps}
        />
        {
          this.renderSelectedMembers()
        }
      </div>
    )
  }
}

export default AttendeesSelector;