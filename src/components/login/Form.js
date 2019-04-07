import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class Form extends React.Component {
  state = {
    username: "",
    password: "",
    role: "",
    submitted: false,
  };

  
  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () =>{
    let isError = false
    if(this.state.username === "" && this.state.password === ""){
      isError=true;
      {console.log("Enter username and password")};
    }
    else if(this.state.username === ""){
      isError=true;
      {console.log("Enter username")};
    }    
    else if(this.state.password === ""){
      isError=true;
      {console.log("Enter password")};
    }

    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    // this.props.onSubmit(this.state);
    
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
    }
    
    console.log(this.state);
  };

  render() {
    return (
      <div className="container">
        <form className="login">
          <h1 className="groupName">8'S COMPLEMENT</h1>
          <h2 className="projectName">CRISIS MANAGEMENT SYSTEM</h2>
          <br />
          <TextField
            name="username"
            placeholder="Enter Username"
            value={this.state.username}
            onChange={e => this.change(e)}
          />
          <br />
          <TextField
            name="password"
            placeholder="Enter Password"
            value={this.state.password}
            onChange={e => this.change(e)}
            type="password"
          />
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