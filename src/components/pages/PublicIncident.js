import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addContact } from "../../actions/contactActions";
import Select from 'react-select';

class PublicIncident extends Component {
  state = {
    name: "",
    contact: "",
    incidenttitle: "",
    options: "",
    locaddress: "",
    postalcode: "",
    description: "",
    errors: {}
  };

  checkFields = () => {
    const { name, contact, incidenttitle, options, locaddress, postalcode, description } = this.state;
    var errors = {};
    var empty = require('is-empty');

    // Check For Errors
    const validName = name.match(new RegExp('^[a-zA-Z\\s]*$'));
    if (name === "") {
      errors["name"] = "Name is required.";
    }
    else if (!validName){
      errors["name"] = "Enter a valid name.";
    }

    const validContact = contact.match(new RegExp('^[0-9]{8}$'));
    if (contact === ""){
      errors["contact"] = "Contact is required.";
    }
    else if (!validContact){
      errors["contact"] = "Enter a valid contact.";
    }

    if (incidenttitle === "") {
      errors["incidenttitle"] = "Please provide a title.";
    } 
    if (options === "") {
      errors["options"] = "Please provide at least one Category.";
    }

    if (locaddress === "") {
      errors["locaddress"] = "Address is required.";
    }

    const validPostCode = postalcode.match(new RegExp('^[0-9]{6}$'));
    if (postalcode === ""){
      errors["postalcode"] = "Postal Code is required.";
    }
    else if (!validContact){
      errors["postalcode"] = "Enter a valid Postal Code.";
    }

    if (description === "") {
      errors["description"] = "A brief description of the incident will help us, thanks!";
    }

    if(empty(errors)){
      return true;
    }
    else{
      this.setState({errors: errors})
      return false;
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const canSubmit = this.checkFields();
    console.log(this.state.options);
    console.log(canSubmit);
   
    if(canSubmit === true) {
      const { name, contact, incidenttitle, options, locaddress, postalcode, description } = this.state
      console.log(this.state);
      // Clear State
      this.setState({
        name: "",
        contact: "",
        incidenttitle: "",
        options: "",
        locaddress: "",
        postalcode: "",
        description: "",
        errors: {}
      });

      window.confirm("Incident submitted!")

      this.props.history.push("/");
    }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, contact, incidenttitle, incidentcategory, locaddress, postalcode, description, errors } = this.state;
    const options = [
      { value: 'Terrorism', label: 'Terrorism' },
      { value: 'Fire', label: 'Fire' },
    ]

    return (
      <body className="background">
      <div class="bodybg" className="formcontainer"> 
        <div className="card-header"><span class="firstwordsel">sumbit</span> incident report</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Name: "
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextInputGroup
            label='Contact: '
            name='contact'
            placeholder='Enter contact'
            value={contact}
            onChange={this.onChange}
            error={errors.contact}
            />
            <TextInputGroup
              label="Incident Title: "
              name="incidenttitle"
              placeholder="Enter Incident Title"
              value={incidenttitle}
              onChange={this.onChange}
              error={errors.incidenttitle}
            />
            <div className="formlabel2">Incident Category: </div>
            <Select 
            isMulti 
            options={options} 
            onChange={this.handleChange}/>

            <TextInputGroup
              label="Address: "
              name="locaddress"
              type="locaddress"
              placeholder="Enter Address"
              value={locaddress}
              onChange={this.onChange}
              error={errors.locaddress}
            />
            <TextInputGroup
              label="Postal Code: "
              name="postalcode"
              type="postalcode"
              placeholder="Enter Postal Code"
              value={postalcode}
              onChange={this.onChange}
              error={errors.postalcode}
            />
            <TextInputGroup
              label="Description: "
              name="description"
              type="description"
              placeholder="Enter Description"
              value={description}
              onChange={this.onChange}
              error={errors.description}
            />
            <input
              type="submit"
              value="submit"
              className="btnSubmit"
            />
          </form>
        </div>
      </div>
      </body>
    );
  }
}

PublicIncident.propTypes = {
  addContact: PropTypes.func.isRequired
};
export default connect(
  null,
  { addContact }
)(PublicIncident);
