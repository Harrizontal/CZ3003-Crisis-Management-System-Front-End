import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addContact } from "../../actions/contactActions";


class PublicIncident extends Component {
  state = {
    name: "",
    contact: "",
    incidenttitle: "",
    incidentcategory: "",
    locaddress: "",
    postalcode: "",
    description: "",
    errors: {}
  };

  checkFields = () => {
    const { name, contact, incidenttitle, incidentcategory, locaddress, postalcode, description } = this.state;
    var categoryTypes = ['']

    // Check For Errors
    const validName = name.match(new RegExp('^[a-zA-Z\\s]*$'));
    console.log(validName);
    if (name === "" || !validName) {
      this.setState({ errors: { name: "Enter valid name" } });
      return false;
    }

    const validContact = contact.match(new RegExp('^[0-9]{8}$'));
    if (contact === "" || !validContact) {
      this.setState({ errors: { contact: "Enter valid contact" } });
      return false;
    }


    if (incidenttitle === "") {
      this.setState({ errors: { incidenttitle: "Phone is required" } });
      return false;
    }

    if (locaddress === "") {
      this.setState({ errors: { locaddress: "Address is required" } });
      return false;
    }

    const validPostCode = postalcode.match(new RegExp('^[0-9]{6}$'));
    if (postalcode === "" || !validPostCode) {
      this.setState({ errors: { postalcode: "Enter valid Postal Code" } });
      return false;
    }

    if (description === "") {
      this.setState({ errors: { description: "Please provide a brief description of the incident." } });
      return false;
    }
    return true;
  }

  onSubmit = e => {
    e.preventDefault();

    const canSubmit = this.checkFields();
   
    if(canSubmit) {
      const { name, contact, incidenttitle, incidentcategory, locaddress, postalcode, description } = this.state
      
      const newContact = {
        name,
        contact,
        incidenttitle
      };

      //// SUBMIT CONTACT ////

      this.props.addContact(newContact);

      // Clear State
      this.setState({
        name: "",
        contact: "",
        incidenttitle: "",
        locaddress: "",
        postalcode: "",
        description: "",
        errors: {}
      });

      this.props.history.push("/");
    }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, contact, incidenttitle, locaddress, postalcode, description, errors } = this.state;

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
