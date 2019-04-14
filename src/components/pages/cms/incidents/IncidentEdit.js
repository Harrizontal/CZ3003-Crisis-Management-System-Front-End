import React, { Component } from "react";
import TextInputGroup from "../../../layout/TextInputGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { transparent } from "material-ui/styles/colors";
import { getIncident } from "../../../../actions/incidentActions";

class IncidentEdit extends Component {
  state = {
    show: false,
    incidentid: "",
    status: "",
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
    assType: [
      { value: "1", label: "Emergency Ambulance" },
      { value: "2", label: "Rescue and Evacuation" },
      { value: "3", label: "Fire Fighting" },
      { value: "4", label: "Gas Leak Control" }
    ],
    selectedAssType: null,
    agencyType: [
      { value: "1", label: "SCDF" },
      { value: "2", label: "SPF" },
      { value: "3", label: "Singapore Power" }
    ],
    selectedAgencyType: null
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getIncident(id);
  }

  formatState(incident) {
    var fieldsOption = this.state.options;
    var fieldsAssTypeOption = this.state.assType;
    var fieldsAgencyTypeOption = this.state.agencyType;

    var selectedOption = [];
    incident.emergencyType.map(function(value) {
      for (var i = 0; i < fieldsOption.length; i++) {
        if (fieldsOption[i].label == value.emergencyName) {
          selectedOption.push(fieldsOption[i]);
          break;
        }
      }
    });

    var selectedAssType = [];
    incident.assistanceType.map(function(value) {
      for (var i = 0; i < fieldsAssTypeOption.length; i++) {
        if (fieldsAssTypeOption[i].label == value.assistanceName) {
          selectedAssType.push(fieldsAssTypeOption[i]);
          break;
        }
      }
    });

    var selectedAgencyType = [];
    incident.relevantAgencies.map(function(value) {
      for (var i = 0; i < fieldsAgencyTypeOption.length; i++) {
        if (fieldsAgencyTypeOption[i].label == value.agencyName) {
          selectedAgencyType.push(fieldsAgencyTypeOption[i]);
          break;
        }
      }
    });

    var state = {
      show: true,
      incidentid: incident.incidentID,
      status: incident.status[0].statusname,
      name: incident.reportedUser.name,
      contact: incident.reportedUser.mobilePhone,
      nric: incident.reportedUser.userIC,
      locaddress: incident.address,
      postalcode: incident.postalCode,
      description: incident.description,
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
      selectedOption: selectedOption,
      assType: [
        { value: "1", label: "Emergency Ambulance" },
        { value: "2", label: "Rescue and Evacuation" },
        { value: "3", label: "Fire Fighting" },
        { value: "4", label: "Gas Leak Control" }
      ],
      selectedAssType: selectedAssType,
      agencyType: [
        { value: "1", label: "SCDF" },
        { value: "2", label: "SPF" },
        { value: "3", label: "Singapore Power" }
      ],
      selectedAgencyType: selectedAgencyType
    };

    this.setState({ ...state });
  }
  componentWillReceiveProps(nextProps, nextState) {
    console.log(nextProps.incident);
    if (nextProps.incident == undefined || nextProps.incident.length == 0) {
      console.log("No Incident");
      this.setState({ show: false });
    } else {
      console.log("Got incident");
      this.formatState(nextProps.incident);
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  handleChange = selectedOption => {
    this.setState({ selectedOption });
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
    var errors = {};
    var empty = require("is-empty");
    if (empty(selectedAssType)) {
      this.setState({ errors: errors });
    }
  };
  handleChangeAgency = selectedAgencyType => {
    this.setState({ selectedAgencyType });
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

  generateButtons = status => {
    switch (status) {
      case "Pending":
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input type="submit" value="Edit" className="btnSubmit" />
            <input type="submit" value="Approve" className="btnSubmit" />
            <input type="submit" value="Reject" className="btnSubmit" />
          </div>
        );
      case "Ongoing":
        return <input type="submit" value="Edit" className="btnSubmit" />;
      default:
        return null;
    }
  };

  onSubmit = e => {
    e.preventDefault();

    const canSubmit = this.checkFields();
    console.log(canSubmit);

    if (canSubmit === true) {
      const {
        name,
        contact,
        nric,
        selectedOption,
        locaddress,
        postalcode,
        description,
        selectedAssType,
        selectedAgencyType
      } = this.state;
      console.log(this.state);
      // Clear State
      this.setState({
        name: "",
        contact: "",
        nric: "",
        selectedOption: {},
        locaddress: "",
        postalcode: "",
        description: "",
        errors: {},
        selectedAssType: "",
        selectedAgencyType: ""
      });

      window.confirm("Incident Editted!");

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
      selectedAgencyType,
      incidentid,
      status
    } = this.state;
    console.log(this.state);
    console.log(selectedAgencyType);
    return (
      <body className="backgroundNoLogo">
        {this.state.show ? (
          <div className="bodybg formcontainer">
            <div className="editIncidentTitle">
              <div className="incident-header">
                <span className="firstwordsel">edit</span> incident report:{" "}
              </div>
              <div className="incidentLabel">
                IncidentID: <label>{incidentid}</label>
              </div>
              <div className="incidentLabel">
                Status: <label>{status}</label>
              </div>
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
                  {this.generateButtons(status)}
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div>No incident found</div>
        )}
      </body>
    );
  }
}

IncidentEdit.propTypes = {
  getIncident: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  incident: state.incident.incident
});

export default connect(
  mapStateToProps,
  { getIncident }
)(IncidentEdit);
