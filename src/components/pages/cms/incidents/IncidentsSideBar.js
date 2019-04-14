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
    this.props.getIncidents();
  }

  changeTab(value) {
    this.setState({ view: value });
  }

  calculateIncident(incidents, status) {
    let showIncidents = incidents.filter(incident => {
      if (status == "all") {
        return incident;
      } else {
        var lengthOfStatus = incident["properties"]["statuses"].length - 1;
        console.log(incident["properties"]["statuses"]);
        return (
          incident["properties"]["statuses"][lengthOfStatus]["statusName"] ==
          status
        );
      }
    });

    return showIncidents.length;
  }

  render() {
    const { incidents } = this.props;

    let showIncidents = incidents.filter(incident => {
      if (this.state.view == "all") {
        this.state.title = "Recent Incidents";
        return incident;
      } else {
        // wrong...
        this.state.title = this.state.view + " Incidents";
        var lengthOfStatus = incident["properties"]["statuses"].length - 1;
        return (
          incident["properties"]["statuses"][lengthOfStatus]["statusName"] ==
          this.state.view
        );
      }
    });

    return (
      <div className="incident-sidebar-container">
        <div className="incident-siderbar-header">
          <div
            className="incident-sidebar-item"
            onClick={() => this.changeTab("all")}
          >
            <span className="big">
              {this.calculateIncident(incidents, "all")}
            </span>
            <span className="small">Total Incident</span>
          </div>
          <div
            className="incident-sidebar-item"
            onClick={() => this.changeTab("Pending")}
          >
            <span className="big">
              {this.calculateIncident(incidents, "Pending")}
            </span>
            <span className="small">Pending Incidents</span>
          </div>
          <div
            className="incident-sidebar-item"
            onClick={() => this.changeTab("Ongoing")}
          >
            <span className="big">
              {this.calculateIncident(incidents, "Ongoing")}
            </span>
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
