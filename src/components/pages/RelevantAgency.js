import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";
import { getIncidents, getIncident } from "../../actions/incidentActions";
import Incident from "../pages/cms/incidents/Incident";

class RelevantAgency extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { valid: false };
  // }
  state={
    open: false
  }

  onSubmit = e => {
    e.preventDefault();
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleNoClose = () => {
    this.setState({ open: false });
    console.log("Incident not yet resolved!")
  };
  handleYesClose = () => {
    this.setState({ open: false });
    console.log("Incident resolved!")
  };
  render() {
    // return (
    //   <div>{this.state.valid ? <div>Is true</div> : <div>Is false</div>}</div>
    // );
    return (
        <div className="bgRelevantAgency">
        <div className="containerDisplayIncident">
          <div className="headerRelevantAgency">VIEW INCIDENT REPORT:</div> <br/>
          <div className="incidentProperties">IncidentID : {}</div> <br/>
          <div className="incidentProperties">Status: {}</div> <br/>
          <div className="incidentProperties">Name: {}</div> <br/>
          <div className="incidentProperties">Contact: {}</div> <br/>
          <div className="incidentProperties">NRIC: {}</div> <br/>
          <div className="incidentProperties">Address: {}</div> <br/>
          <div className="incidentProperties">Postal Code: {}</div> <br/>
          <div className="incidentProperties">Description: {}</div> <br/>
          <div className="incidentProperties">Incident Category: {}</div> <br/>
          <div className="incidentProperties">Assistance Required: {}</div> <br/>
          <div className="incidentProperties">Relevant Agency: {}</div> 
          <div className="buttonsRelevantAgencies">
            <input type="submit" value="Resolve" className="btnResolve" onClick={this.handleClickOpen}/>
            <input type="submit" value="Go Back" className="btnGoBack" />
          </div>
        </div>  
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Resolve the incident?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to change the status of the incident to "Resolved"?
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
    );
  }
}

const mapStateToProps = state => ({
  incidents: state.incident.incidents
  //   incidents: state.incidents
});

export default connect(
  mapStateToProps,
  { getIncidents }
)(RelevantAgency);