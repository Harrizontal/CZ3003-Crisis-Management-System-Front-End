import React, { Component } from "react";
import TextInputGroup from "../../../layout/TextInputGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { transparent } from "material-ui/styles/colors";
import { addIncident } from "../../../../actions/incidentActions";

class IncidentCreate extends Component {
  state = {
    name: "",
    contact: "",
    nric: "",
    locaddress: "",
    postalcode: "",
    description: "",
    errors: {},
    options: [
      { value: "1", label: "Fire" },
      { value: "2", label: "Flood" },
      { value: "3", label: "Earthquake" },
      { value: "4", label: "Gas Leak" },
      { value: "5", label: "Drought" },
      { value: "6", label: "Terroist" },
      { value: "7", label: "Others" }
    ],
    selectedOption: null,
    selectedOptionId: null,
    assType: [
      { value: "1", label: "Emergency Ambulance" },
      { value: "2", label: "Rescue and Evacuation" },
      { value: "3", label: "Fire Fighting" },
      { value: "4", label: "Gas Leak Control" }
    ],
    selectedAssType: null,
    selectedAssTypeId: null,
    agencyType: [
      { value: "1", label: "SCDF" },
      { value: "2", label: "SPF" },
      { value: "3", label: "Singapore Power" }
    ],
    selectedAgencyType: null,
    selectedAgencyTypeId: null
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleChange = selectedOption => {
    this.setState({ selectedOption });

    let arrayValue = [];

    // get all selected option's id
    selectedOption.map(function(option) {
      arrayValue.push(parseInt(option["value"]));
    });

    this.setState({ selectedOptionId: arrayValue });

    var errors = {};
    var empty = require("is-empty");
    for (var i = 0; i < selectedOption.length; i++) {
      console.log(selectedOption[i]["value"]);
      if (selectedOption[i]["value"] == 7) {
        errors["selectedoption"] = "Please describe in Description Field";
        this.setState({ errors: errors });
        break;
      } else this.setState({ errors: {} });
    }
    if (empty(selectedOption)) {
      this.setState({ errors: {} });
    }
  };
  handleChangeAss = selectedAssType => {
    this.setState({ selectedAssType });

    let arrayValue = [];

    // get all selected option's id
    selectedAssType.map(function(option) {
      arrayValue.push(parseInt(option["value"]));
    });

    this.setState({ selectedAssTypeId: arrayValue });

    var errors = {};
    var empty = require("is-empty");
    if (empty(selectedAssType)) {
      this.setState({ errors: errors });
    }
  };
  handleChangeAgency = selectedAgencyType => {
    this.setState({ selectedAgencyType });

    let arrayValue = [];

    // get all selected option's id
    selectedAgencyType.map(function(option) {
      arrayValue.push(parseInt(option["value"]));
    });

    this.setState({ selectedAgencyTypeId: arrayValue });

    var errors = {};
    var empty = require("is-empty");
    if (empty(selectedAgencyType)) {
      this.setState({ errors: errors });
    }
  };
  checkFields = () => {
    const {
      name,
      contact,
      nric,
      selectedOption,
      locaddress,
      postalcode,
      description,
      selectedAgencyType,
      selectedAssType
    } = this.state;
    var errors = {};
    var empty = require("is-empty");
    console.log(selectedOption);

    // Check For Errors
    const validName = name.match(new RegExp("^[a-zA-Z\\s]*$"));
    if (name === "") {
      errors["name"] = "Name is required.";
    } else if (!validName) {
      errors["name"] = "Enter a valid name.";
    }

    const validContact = contact.match(new RegExp("^[0-9]{8}$"));
    if (contact === "") {
      errors["contact"] = "Contact is required.";
    } else if (!validContact) {
      errors["contact"] = "Enter a valid contact.";
    }

    const validNRIC = nric.match(new RegExp(/^[STFGstfg]\d{7}[A-Za-z]$/));
    if (nric === "") {
      errors["nric"] = "Please provide a NRIC.";
    } else if (!validNRIC) {
      errors["nric"] = "Enter a valid NRIC.";
    }

    if (locaddress === "") {
      errors["locaddress"] = "Address is required.";
    }

    if (postalcode !== "") {
      const validPostCode = postalcode.match(new RegExp("^[0-9]{6}$"));
      if (!validPostCode) {
        errors["postalcode"] = "Enter a valid Postal Code.";
      }
    }

    if (description === "") {
      errors["description"] =
        "A brief description of the incident will help us, thanks!";
    }

    if (selectedOption == null || empty(selectedOption)) {
      errors["selectedoption"] = "Please select at least one.";
    }

    if (selectedAssType == null || empty(selectedAssType)) {
      errors["selectedAssType"] = "Please select at least one.";
    }

    if (selectedAgencyType == null || empty(selectedAgencyType)) {
      errors["selectedAgencyType"] = "Please select at least one.";
    }
    if (empty(errors)) {
      return true;
    } else {
      this.setState({ errors: errors });
      return false;
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const canSubmit = this.checkFields();
    console.log(canSubmit);

    if (canSubmit === true) {
      const {
        name,
        contact,
        nric,
        locaddress,
        description,
        selectedOptionId,
        selectedAssTypeId,
        selectedAgencyTypeId
      } = this.state;

      // incident object must match the params in the API
      let incident = {
        name: name,
        userIC: nric,
        mobilePhone: contact,
        description: description,
        address: locaddress,
        assistance_type: selectedAssTypeId,
        emergency_type: selectedOptionId,
        relevant_agencies: selectedAgencyTypeId
      };
      dispatch(addIncident(incident)).then(
        response => {
          this.setState({
            name: "",
            contact: "",
            nric: "",
            selectedOption: null,
            selectedOptionId: null,
            selectedAssType: null,
            selectedAssTypeId: null,
            selectedAgencyType: null,
            selectedAgencyTypeId: null,
            locaddress: "",
            postalcode: "",
            description: "",
            errors: {},
            note: {}
          });

          console.log("Incident submitted successfully");
          alert("Incident submitted successfully");
        },
        error => {
          alert("Error. Note that address must be valid to process");
        }
      );
      // Clear State
      // this.setState({
      //   name: "",
      //   contact: "",
      //   nric: "",
      //   selectedOption: {},
      //   locaddress: "",
      //   postalcode: "",
      //   description: "",
      //   errors: {},
      //   selectedAssType: "",
      //   selectedAgencyType: ""
      // });
    }
  };

  render() {
    const customStyles = {
      fontFamily: "Rubik",
      option: (provided, state) => ({
        ...provided,
        fontFamily: "Rubik"
      }),
      control: () => ({
        // none of react-select's styles are passed to <Control />
        background: transparent,
        width: 800
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";

        return { ...provided, opacity, transition };
      }
    };

    const {
      name,
      contact,
      nric,
      locaddress,
      postalcode,
      description,
      errors,
      options,
      selectedOption,
      assType,
      selectedAssType,
      agencyType,
      selectedAgencyType
    } = this.state;

    return (
      <body className="backgroundNoLogo">
        <div className="bodybg formcontainer">
          <div className="card-header">
            <span className="firstwordsel">create</span> incident report
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="textgroup1">
                <TextInputGroup
                  label="Name: "
                  name="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextInputGroup
                  label="Contact: "
                  name="contact"
                  placeholder="Enter contact"
                  value={contact}
                  onChange={this.onChange}
                  error={errors.contact}
                />
                <TextInputGroup
                  label="NRIC: "
                  name="nric"
                  placeholder="Enter NRIC"
                  value={nric}
                  onChange={this.onChange}
                  error={errors.nric}
                />
              </div>
              <div className="textgroup2">
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
              </div>
              <div className="selectgroup">
                <div className="formlabel2">Incident Category: </div>
                <Select
                  isMulti
                  value={selectedOption}
                  onChange={this.handleChange}
                  options={options}
                  className="basic-multi-select"
                  styles={customStyles}
                  error={errors.selectedOption}
                />
                {errors["selectedAssType"] && (
                  <div className="invalid-feedback">
                    {errors["selectedAssType"]}
                  </div>
                )}
                <div className="formlabel2">Assistance Required: </div>
                <Select
                  isMulti
                  value={selectedAssType}
                  onChange={this.handleChangeAss}
                  options={assType}
                  className="basic-multi-select"
                  styles={customStyles}
                  error={errors.selectedAssType}
                />
                {errors["selectedAssType"] && (
                  <div className="invalid-feedback">
                    {errors["selectedAssType"]}
                  </div>
                )}
                <div className="formlabel2">Relevant Agencies: </div>
                <Select
                  isMulti
                  value={selectedAgencyType}
                  onChange={this.handleChangeAgency}
                  options={agencyType}
                  className="basic-multi-select"
                  styles={customStyles}
                  error={errors.selectedAgencyType}
                />
                {errors["selectedAgencyType"] && (
                  <div className="invalid-feedback">
                    {errors["selectedAgencyType"]}
                  </div>
                )}
                <input type="submit" value="create" className="btnSubmit" />
              </div>
            </form>
          </div>
        </div>
      </body>
    );
  }
}

export default connect(null)(IncidentCreate);
