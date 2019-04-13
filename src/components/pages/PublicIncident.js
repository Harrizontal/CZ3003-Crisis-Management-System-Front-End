import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import Select from "react-select";
import { transparent } from "material-ui/styles/colors";
import { createIncident } from "../../actions/publicActions";

class PublicIncident extends Component {
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
    selectedAssTypeId: null
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    let arrayValue = [];
    this.setState({ selectedOption });

    // get all selected option's id
    selectedOption.map(function(option) {
      arrayValue.push(parseInt(option["value"]));
    });

    this.setState({ selectedOptionId: arrayValue });

    var errors = {};
    var empty = require("is-empty");
    for (var i = 0; i < selectedOption.length; i++) {
      // if is others
      if (selectedOption[i]["value"] == 7) {
        errors["selectedoption"] = "Please describe in Description Field";
        this.setState({ errors: errors });
        break;
      } else {
        this.setState({ errors: {} });
      }
    }
    if (empty(selectedOption)) {
      this.setState({ errors: {} });
    }
  };

  handleChangeAss = selectedAssType => {
    let arrayValue = [];
    this.setState({ selectedAssType });

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

  checkFields = () => {
    const {
      name,
      contact,
      nric,
      selectedOption,
      locaddress,
      postalcode,
      description
    } = this.state;
    var errors = {};
    var empty = require("is-empty");

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

    if (canSubmit === true) {
      const {
        name,
        contact,
        nric,
        selectedOptionId,
        locaddress,
        description,
        selectedAssTypeId
      } = this.state;

      // follow API parameters
      let incident = {
        address: locaddress,
        userIC: nric,
        name: name,
        mobilePhone: contact,
        description: description,
        emergency_type: selectedOptionId,
        assistance_type: selectedAssTypeId
      };

      dispatch(createIncident(incident)).then(
        response => {
          this.setState({
            name: "",
            contact: "",
            nric: "",
            selectedOption: null,
            locaddress: "",
            postalcode: "",
            description: "",
            errors: {},
            note: {}
          });

          console.log("Incident submitted successfully");
        },
        error => {
          console.log("Error!");
        }
      );

      // Clear State
      console.log("incident submitted");

      this.props.history.push("/");
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
        width: 500
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
      selectedAssType
    } = this.state;

    return (
      <body className="background">
        <div className="formcontainer bodybg">
          <div className="card-header">
            <span className="firstwordsel">sumbit</span> incident report
          </div>
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
              <div className="formlabel2">Incident Category: </div>
              <Select
                isMulti
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
                className="basic-multi-select"
                styles={customStyles}
              />
              {errors["selectedoption"] && (
                <div className="invalid-feedback">
                  {errors["selectedoption"]}
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
              <input type="submit" value="submit" className="btnSubmit" />
            </form>
          </div>
        </div>
      </body>
    );
  }
}

export default connect(null)(PublicIncident);
