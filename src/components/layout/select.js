import React from 'react';
import Select from 'react-select';
 
const options = [
    { value: 'Terrorism', label: 'Terrorism' },
    { value: 'Fire', label: 'Fire' },
  ]
 
class App extends React.Component {
  state = {
    selectedOption: null,
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  render() {
    const { selectedOption } = this.state;
 
    return (
      <Select
        isMulti
        value={selectedOption}
        onChange={this.handleChange}
        options={option}
        className="basic-multi-select"
      />
    );
  }
}