import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getIncidents } from "../../../../actions/incidentActions";
import Incident from "./Incident";

class IncidentsSideBar extends Component {
  state = {
    view: "all",
    title: "Recent Incidents"
  };
  componentDidMount() {
    console.log("componentDidMount");
    this.props.getIncidents();
  }

  changeTab(value) {
    this.setState({ view: value });
  }

  render() {
    console.log("Rendering");
    // console.log(this.props);
    const { incidents } = this.props;

    let showIncidents = incidents.filter(incident => {
      if (this.state.view == "all") {
        this.state.title = "Recent Incidents";
        return incident;
      } else {
        this.state.title = this.state.view + " Incidents";
        return incident["properties"]["status"] == this.state.view;
      }
    });

    console.log(incidents);

    return (
      <div className="incident-sidebar-container">
        <div className="incident-siderbar-header">
          <div
            className="incident-sidebar-item"
            onClick={() => this.changeTab("all")}
          >
            <span className="big">15</span>
            <span className="small">Total Incident</span>
          </div>
          <div
            className="incident-sidebar-item"
            onClick={() => this.changeTab("Pending")}
          >
            <span className="big">15</span>
            <span className="small">Pending Incidents</span>
          </div>
          <div
            className="incident-sidebar-item"
            onClick={() => this.changeTab("Outgoing")}
          >
            <span className="big">15</span>
            <span className="small">Ongoing Incidents</span>
          </div>
        </div>
        <div className="incident-sidebar-title">
          <span>{this.state.title}</span>
        </div>
        <div style={{ height: "auto", width: "100%", overflowY: "scroll" }}>
          {showIncidents.map(incident => {
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
