import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteContact } from "../../../../actions/contactActions";

class Incident extends Component {
  onDeleteClick = id => {
    //// DELETE CONTACT ////
    this.props.deleteContact(id);
  };

  displayMessage(status) {
    if (status == "Pending") {
      return <span>Request for approval</span>;
    }
  }

  displayTime(date) {
    var date = date.slice(0, -5) + "08:00";
    var today = new Date();
    var incidentDate = new Date(date);
    var diffMs = today - incidentDate;
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    if (diffDays == 0) {
      if (diffHrs == 0) {
        if (diffMins == 0) {
          return "created a few seconds ago";
        }
        return "created " + diffMins + " mins ago";
      }
      return "created " + diffHrs + " hours ago";
    }
    return "created " + diffDays + " days ago";
  }

  render() {
    const {
      incidentID,
      address,
      emergencyType,
      timeStamp,
      statuses
    } = this.props.incident;

    var length = statuses.length - 1;
    let status = statuses[length]["statusName"];
    // const test = this.props.incident;

    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/cms/incident/${incidentID}`}
      >
        <div className="incident-card">
          <div className="first-section">
            <div className="address">{address}</div>
            <div className="pendingCircle">{status}</div>
          </div>
          <div className="second-section">
            <div>{this.displayMessage(status)}</div>
          </div>
          <div className="third-section">
            <div>{this.displayTime(timeStamp)}</div>
          </div>
        </div>
      </Link>
    );
  }
}

Incident.propTypes = {
  contact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteContact }
)(Incident);
