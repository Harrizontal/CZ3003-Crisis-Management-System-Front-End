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
  render() {
    const {
      id,
      address,
      emergency_type,
      time_stamp,
      status
    } = this.props.incident;

    // const test = this.props.incident;
    console.log(this.props.incident);

    let statusClassName = status + "Circle";
    return (
      <Link style={{ textDecoration: "none" }} to={`/cms/incident/${id}`}>
        <div className="incident-card">
          <div className="first-section">
            <div>{address}</div>
            <div className="pendingCircle">{status}</div>
          </div>
          <div className="second-section">
            <div>{emergency_type}</div>
          </div>
          <div className="third-section">
            <div>{this.displayMessage(status)}</div>
            <div>{time_stamp}</div>
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
