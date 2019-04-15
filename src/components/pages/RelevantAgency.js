import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import {
  accessPublicAgencyLink,
  approveIncidentLink
} from "../../actions/publicActions";

class RelevantAgency extends Component {
  state = {
    show: false,
    showResolveButton: true,
    open: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    this.props.accessPublicAgencyLink(id);
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

  formatState(incident) {
    var selectedOption = "";
    incident.emergencyType.map(function(value) {
      selectedOption = selectedOption + value.emergencyName + " ";
    });

    var selectedAssType = "";
    incident.assistanceType.map(function(value) {
      selectedAssType = selectedAssType + value.assistanceName + " ";
    });

    var selectedAgencyType = "";
    incident.relevantAgencies.map(function(value) {
      selectedAgencyType = selectedAgencyType + value.agencyName + " ";
    });

    var showResolveButton = false;

    var length = incident.status.length - 1;

    if (incident.status[length].statusname == "Resolved") {
      showResolveButton = false;
    } else {
      showResolveButton = true;
    }
    var state = {
      show: true,
      showResolveButton: showResolveButton,
      incidentid: incident.incidentID,
      status: incident.status[length].statusname,
      name: incident.reportedUser.name,
      contact: incident.reportedUser.mobilePhone,
      nric: incident.reportedUser.userIC,
      locaddress: incident.address,
      postalcode: incident.postalCode,
      description: incident.description,
      emergencyType: selectedOption,
      assistanceType: selectedAssType,
      relevantAgency: selectedAgencyType
    };

    this.setState({ ...state });
  }

  onSubmit = e => {
    e.preventDefault();
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleGoBack = () => {
    this.props.history.goBack();
  };
  handleNoClose = () => {
    this.setState({ open: false });
    console.log("Incident not yet resolved!");
  };
  handleYesClose = () => {
    this.setState({ open: false });
    const { id } = this.props.match.params;
    this.props.approveIncidentLink(id).then(
      res => {
        alert("Approve successfuly");
        this.setState({ showResolveButton: false });
      },
      error => {
        alert("Incident has already approve");
        this.setState({ showResolveButton: false });
      }
    );
  };
  render() {
    // return (
    //   <div>{this.state.valid ? <div>Is true</div> : <div>Is false</div>}</div>
    // );
    return (
      <div className="bgRelevantAgency">
        {this.state.show ? (
          <div>
            <div className="containerDisplayIncident">
              <div className="headerRelevantAgency">VIEW INCIDENT REPORT</div>{" "}
              <br />
              <div className="incidentProperties">
                IncidentID : {this.state.incidentid}
              </div>{" "}
              <br />
              <div className="incidentProperties">
                Status: {this.state.status}
              </div>{" "}
              <br />
              <div className="incidentProperties">
                Name: {this.state.name}
              </div>{" "}
              <br />
              <div className="incidentProperties">
                Contact: {this.state.contact}
              </div>
              <br />
              <div className="incidentProperties">
                NRIC: {this.state.nric}
              </div>{" "}
              <br />
              <div className="incidentProperties">
                Address: {this.state.locaddress}
              </div>
              <br />
              <div className="incidentProperties">
                Postal Code: {this.state.postalcode}
              </div>
              <br />
              <div className="incidentProperties">
                Description: {this.state.description}
              </div>
              <br />
              <div className="incidentProperties">
                Emergency Type: {this.state.emergencyType}{" "}
              </div>
              <br />
              <div className="incidentProperties">
                Assistance Required:{this.state.assistanceType}
              </div>
              <br />
              <div className="incidentProperties">
                Relevant Agency: {this.state.relevantAgency}
              </div>
              <div className="buttonsRelevantAgencies">
                {this.state.showResolveButton && (
                  <input
                    type="submit"
                    value="Resolve"
                    className="btnResolve"
                    onClick={this.handleClickOpen}
                  />
                )}
              </div>
            </div>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Resolve the incident?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to change the status of the incident to
                  "Resolved"?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleNoClose} color="primary">
                  No
                </Button>
                <Button onClick={this.handleYesClose} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : (
          <div>no incident</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  incident: state.incident.incident
  //   incidents: state.incidents
});

export default connect(
  mapStateToProps,
  { accessPublicAgencyLink, approveIncidentLink }
)(RelevantAgency);
