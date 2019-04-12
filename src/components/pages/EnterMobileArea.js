import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from 'react-select';

class EnterMobileArea extends Component {
  state = {
    mobileNumber: "",
    areaCode: null,
    errors: {},
    options: [
        { value: 'east', label: 'East' },
        { value: 'west', label: 'West' },
        { value: 'north', label: 'North' },
        { value: 'south', label: 'South' },
        { value: 'central', label: 'Central' },
    ],
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    let isError = false;
    let errors = {};

    if(this.state.mobileNumber.length < 8 || this.state.mobileNumber.length >8) {
        isError = true;
        errors["mobileNumber"] = "Please enter valid mobile number!"
    }
    if(this.state.areaCode===null){
        isError = true;
        errors["areaCode"] = "Please select an area!"
    }

    this.setState({errors: errors});
    return isError;
  };
  
  onChange = (areaCode) => {
    this.setState({ areaCode });
  }

  onSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const err = this.validate();
    if (err) {
      this.setState({
        mobileNumber: "",
        areaCode: null,
      });
    }
    if (!err) {
      console.log(this.state.mobileNumber, this.state.areaCode);
      this.props.history.push("/");
    }
  };

  render() {
    const {mobileNumber, areaCode, options} = this.state;
    
    return (
      <MuiThemeProvider>
        <body className="backgroundLogin">
            <form className="formEnterMobileArea">
                <TextField
                    name="mobileNumber"
                    className="mobileNumberTextInput"
                    placeholder="Enter your mobile number"
                    value={this.state.mobileNumber}
                    onChange={e => this.change(e)}
                    type="number" 
                />
                <div className="errorMsg">{this.state.errors.mobileNumber}</div>
                <br />
                <Select
                    className="areaCodeSelect"
                    value={this.state.areaCode}
                    placeholder="Select your current area"
                    onChange={this.onChange}
                    options={options}
                />
                <br />
                <div className="errorMsg">{this.state.errors.areaCode}</div>
                <br />
                <br />
                <Button
                    className="enterMobileAreaSubmitBTN"
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={e => this.onSubmit(e)}
                >
                Submit
                </Button>
            </form>
        </body>
      </MuiThemeProvider>
    );
  }
}

export default EnterMobileArea;