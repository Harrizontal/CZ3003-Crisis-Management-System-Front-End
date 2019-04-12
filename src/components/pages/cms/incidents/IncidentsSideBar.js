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
          <div className="incident-sidebar-region">Region</div>
          <div className="incident-sidebar-country">Singapore</div>
          <div>View By</div>
        </div>
        <div style={{ height: "50%", width: "100%", backgroundColor: "green" }}>
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
