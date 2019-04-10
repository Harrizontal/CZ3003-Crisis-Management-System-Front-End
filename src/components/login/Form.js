import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import { login } from "../../actions/userActions";



class Form extends React.Component {
  state = {
    username: "",
    password: "",
    role: "",
    submitted: false,
    errors: {},
  };

  
  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () =>{
    let isError = false
    let errors = {};

    if(this.state.username === "" && this.state.password === ""){
      isError=true;
      errors["username"] = "Please valid enter username"
      errors["password"] = "Please valid enter password"
      {console.log("Enter username and password")};
    }
    if(this.state.username.length < 6){
      isError=true;
      errors["username"] = "Please enter valid username"
      {console.log("Enter username")};
    }    
    if(this.state.password.length < 6){
      isError=true;
      errors["password"] = "Please enter valid password (min. 6 characters)"
      {console.log("Enter password")};
    }
    this.setState({errors: errors});
    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    // this.props.onSubmit(this.state);
    const { dispatch } = this.props;
    const err = this.validate();
    if(err){
      this.setState({
        username: "",
        password: "",
        role: "",
        submitted: false,
      })
    }
    if(!err){
      var role, submitted;
      this.state.submitted = true;
      this.setState(submitted);

      if(this.state.username.includes("op")){
        this.state.role = "operator";
        this.setState(role);
      }
      else if( (this.state.username.includes("gov")) || (this.state.username.includes("pmo")) ){
        this.state.role = "gov";
        this.setState(role);
      }
      else{
        this.state.role = "gp"
        this.setState(role);
      }
      {console.log(role)};

      dispatch(login(this.state.username, this.state.password)).then(
        user => {
          console.log("accessing to next web page");
          console.log(user);
          this.props.history.push("/cms");
        },
        error => {
          console.log("wrong");
        }
      );
    }
    
    console.log(this.state);
  };

  render() {
    return (
      <div className="container">
        <form className="login">
        <div className="logo"/>
          <h1 className="groupName">8'S COMPLEMENT</h1>
          <h2 className="projectName">CRISIS MANAGEMENT SYSTEM</h2>
          <br />
          <TextField
            name="username"
            placeholder="Enter Username"
            value={this.state.username}
            onChange={e => this.change(e)}
          />
          <div className="errorMsg">{this.state.errors.username}</div>
          <br />
          <TextField
            name="password"
            placeholder="Enter Password"
            value={this.state.password}
            onChange={e => this.change(e)}
            type="password"
          />
          <div className="errorMsg">{this.state.errors.password}</div>
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            className="loginBTN"
            onClick={e => this.onSubmit(e)}
          >Login</Button>
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


export default connect(mapStateToProps)(Form);