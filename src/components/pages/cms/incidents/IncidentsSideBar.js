import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getIncidents } from "../../../../actions/incidentActions";
import { getContacts } from "../../../../actions/contactActions";
import Incident from "./Incident";

class IncidentsSideBar extends Component {
  componentDidMount() {
    console.log("componentDidMount");
    this.props.getIncidents();
  }

  render() {
    console.log("Rendering");
    // console.log(this.props);
    const { incidents } = this.props;
    console.log(incidents);

    return (
      <div className="incident-sidebar-container">
        <div className="incident-siderbar-header">
          <div className="incident-sidebar-item">
            <span className="big">15</span>
            <span className="small">Total Incident</span>
          </div>
          <div className="incident-sidebar-item">
            <span className="big">15</span>
            <span className="small">Pending Incidents</span>
          </div>
          <div className="incident-sidebar-item">
            <span className="big">15</span>
            <span className="small">Ongoing Incidents</span>
          </div>
        </div>
        <div className="incident-sidebar-title">
          <span>Recent Incidents</span>
        </div>
        <div style={{ height: "auto", width: "100%", overflowY: "scroll" }}>
          {incidents.map(incident => {
            return <Incident incident={incident["properties"]} />;
          })}
        </div>
      </div>
    );
  }
}

IncidentsSideBar.propTypes = {
  incidents: PropTypes.array.isRequired,
  getIncidents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  incidents: state.incident.incidents
  //   incidents: state.incidents
});

export default connect(
  mapStateToProps,
  { getIncidents }
)(IncidentsSideBar);
