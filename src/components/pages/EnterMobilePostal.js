import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { subscribe } from "../../actions/publicActions";
import { connect } from "react-redux";

class EnterMobilePostal extends Component {
  state = {
    mobileNumber: "",
    postalCode: "",
    errors: {}
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    let isError = false;
    let errors = {};

    if (
      this.state.mobileNumber.length < 8 ||
      this.state.mobileNumber.length > 8
    ) {
      isError = true;
      errors["mobileNumber"] = "Please enter valid mobile number!";
    }
    if (this.state.postalCode.length < 6 || this.state.postalCode.length > 6) {
      isError = true;
      errors["postalCode"] = "Please enter valid postal code!";
    }

    this.setState({ errors: errors });
    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (err) {
      this.setState({
        mobileNumber: "",
        postalCode: ""
      });
    }
    if (!err) {
      let phoneNoPostalCode = {
        mobileNumber: this.state.mobileNumber,
        postalCode: this.state.postalCode
      };
      this.props.subscribe(phoneNoPostalCode);
      alert("You have subscribed to CMS! Thank you!");
      this.setState({
        mobileNumber: "",
        postalCode: ""
      });
      this.props.history.push("/subscribe");
    }
  };

  render() {
    const { mobileNumber, postalCode } = this.state;

    return (
      <MuiThemeProvider>
        <body className="backgroundLogin">
          <form className="formEnterMobileArea">
            <div className="card-header">Subscribe to CMS</div>
            <TextField
              name="mobileNumber"
              className="mobileNumberTextInput"
              placeholder="Enter your mobile number"
              value={this.state.mobileNumber}
              fullWidth
              onChange={e => this.change(e)}
              type="number"
            />
            <div className="errorMsg">{this.state.errors.mobileNumber}</div>
            <br />
            <TextField
              name="postalCode"
              className="postalCodeTextInput"
              value={this.state.postalCode}
              placeholder="Enter your postal code"
              onChange={this.state.postalCode}
              fullWidth
              onChange={e => this.change(e)}
              type="number"
            />
            <div className="errorMsg">{this.state.errors.postalCode}</div>
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

export default connect(
  null,
  { subscribe }
)(EnterMobilePostal);
