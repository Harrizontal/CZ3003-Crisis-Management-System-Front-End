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
    this.props.accessPublicAgencyLink(id);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.interval = setInterval(
      () => this.props.accessPublicAgencyLink(id),
      5000
    );
  }
  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.incident == undefined || nextProps.incident.length == 0) {
      this.setState({ show: false });
    } else {
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

    var selectedAgencyType = [];
    incident.relevantAgencies.map(function(value) {
      selectedAgencyType.push(value.relevantagency_name);
    });

    var showResolveButton = false;

    var length = incident.statuses.length - 1;

    var getCurrentRA = incident.current_relevant_agency.agencyName;
    var totalRA = incident.relevantAgencies.length;
    for (var i = 0; i < totalRA; i++) {
      if (incident.relevantAgencies[i].relevantagency_name == getCurrentRA) {
        if (incident.relevantAgencies[i].acknowledged) {
          showResolveButton = false;
          break;
        } else {
          showResolveButton = true;
          break;
        }
      }
    }

    var state = {
      show: true,
      showResolveButton: showResolveButton,
      incidentid: incident.incidentID,
      status: incident.statuses[length].statusname,
      name: incident.reportedUser.name,
      contact: incident.reportedUser.mobilePhone,
      nric: incident.reportedUser.userIC,
      locaddress: incident.address,
      postalcode: incident.postalCode,
      description: incident.description,
      emergencyType: selectedOption,
      assistanceType: selectedAssType,
      relevantAgency: incident.relevantAgencies
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
  };
  handleYesClose = () => {
    this.setState({ open: false });
    const { id } = this.props.match.params;
    this.props.approveIncidentLink(id).then(
      res => {
        alert("Approve successfuly");
        this.props.accessPublicAgencyLink(id);
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
                <b>IncidentID:</b> {this.state.incidentid}
              </div>{" "}
              <br />
              <div className="incidentProperties">
                <b>Status:</b> {this.state.status}
              </div>{" "}
              <br />
              <div className="incidentProperties">
                <b>Name:</b> {this.state.name}
              </div>{" "}
              <br />
              <div className="incidentProperties">
                <b>Contact:</b>
                {this.state.contact}
              </div>
              <br />
              <div className="incidentProperties">
                <b>NRIC:</b> {this.state.nric}
              </div>{" "}
              <br />
              <div className="incidentProperties">
                <b>Address:</b> {this.state.locaddress}
              </div>
              <br />
              <div className="incidentProperties">
                <b>Postal Code:</b> {this.state.postalcode}
              </div>
              <br />
              <div className="incidentProperties">
                <b>Description:</b> {this.state.description}
              </div>
              <br />
              <div className="incidentProperties">
                <b>Emergency Type:</b>
                {this.state.emergencyType}{" "}
              </div>
              <br />
              <div className="incidentProperties">
                <b>Assistance Required:</b>
                {this.state.assistanceType}
              </div>
              <br />
              <div className="incidentProperties">
                <b>Relevant Agency contacted:</b>
              </div>
              <br />
              {this.state.relevantAgency.map(function(value) {
                return (
                  <div className="incidentProperties">
                    {value.relevantagency_name}:{" "}
                    {value.acknowledged ? (
                      <div className="green">Resolved</div>
                    ) : (
                      <div className="orange">Unresolved</div>
                    )}
                  </div>
                );
              })}
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
