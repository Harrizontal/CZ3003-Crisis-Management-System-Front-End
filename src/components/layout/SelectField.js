import React from 'react';
import Select from 'react-select';
 
// const options = [
//   { value: '1', label: 'Fire' },
//   { value: '2', label: 'Flood' },
//   { value: '3', label: 'Earthquake' },
//   { value: '4', label: 'Gas Leak' },
//   { value: '5', label: 'Drought' },
//   { value: '6', label: 'Terroist' },
//   ]
 
class SelectField extends React.Component {
  state = {
    selectedOption: null,
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  render() {
    const { selectedOption } = this.state;
    const { options} = this.props;
 
    return (
      <Select
        isMulti
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        className="basic-multi-select"
      />
    );
  }
}

export default SelectField;