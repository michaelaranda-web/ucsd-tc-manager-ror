import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    if (this.props.handleCheckboxChange) {
      this.props.handleCheckboxChange(this.props.label);
    }
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <input
          type="checkbox"
          value={isChecked}
          checked={isChecked}
          onChange={this.toggleCheckboxChange}
        />
        <input className="hidden" id={this.props.id || ""} name={this.props.name || ""} value={isChecked} />
      </div>
    );
  }
}

export default Checkbox;