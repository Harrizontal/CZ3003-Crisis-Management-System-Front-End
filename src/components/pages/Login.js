import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/userActions";

class Login extends Component {
  // take note that properties of state must follow the name of input
  state = {
    username: "",
    password: "",
    submitted: false
  };

  onChange = e => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    console.log("Click login button");
    e.preventDefault();
    this.setState({ submitted: true }); // set submitted to true
    const { username, password } = this.state;
    const { dispatch } = this.props;

    if (username && password) {
      // execute action
      console.log("Execute action for login");
      //dispatch(login(username, password));
      dispatch(login(username, password)).then(
        user => {
          console.log("accessing to next web page");
          console.log(user);
          this.props.history.push("/cms");
        },
        error => {
          console.log("wrong");
        }
      );
      //this.props.login(username, password);
    }
  };

  // always put at the last
  render() {
    const { loggingIn } = this.props;
    console.log(loggingIn);
    const { username, password } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          username:
          <input type="text" name="username" onChange={this.onChange} />
          password:
          <input type="text" name="password" onChange={this.onChange} />
          <input type="submit" value="Submit" />
          {loggingIn && (
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          )}
        </form>
      </div>
    );
  }
}

// Login.propTypes = {
//   login: PropTypes.func.isRequired
// };

// mapping state to props to display data(?)
// must return object
const mapStateToProps = state => ({
  loggingIn: state.authentication.loggingIn // passing logging state from authentication reducer
});

// function mapStateToProps(state) {
//   const { loggingIn } = state.authentication; // see reducers!
//   return loggingIn;
// }

export default connect(mapStateToProps)(Login);
