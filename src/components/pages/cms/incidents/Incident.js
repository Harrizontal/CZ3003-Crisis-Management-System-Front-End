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

  render() {
    const {
      id,
      address,
      postal_code,
      description,
      emergency_type,
      assistance_type,
      relevant_agency,
      time_stamp,
      status,
      reported_user,
      phone_no
    } = this.props.incident;

    // const test = this.props.incident;
    console.log(this.props.incident);

    return (
      <Link style={{ textDecoration: "none" }} to={`/cms/incident/${id}`}>
        <div className="incident-card">
          <div>{address}</div>
          <div>{status}</div>
          <div>{time_stamp}</div>
          <div>{reported_user}</div>
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

// // the json response is in special format (known as geojson)
// data:{
//   type: "FeatureCollection", // standard
//   features: [ // standard
//     { // note that it is in an object form
//       type: "Feature", // standard
//       geometry: { // standard
//         type: "Point", // standard
//         coordinates: [103.839, 1.375] // based on database. [lon,lat]. Note that is in an array
//       },
//       properties: { // standard
//         id: "1", // based on incidentId
//         address: "XXXX", // based on address
//         postal_code: "12345678123", // based on postalCode
//         description: "XXXXXXXX",
//         emergency_type: ["Fire","Flood","Earthquake","Gas Leak"], // everything put in array | or you guys can give me id then i process from there
//         assistance_type: ['Emergency Ambulance'], // everything put in array or you guys can me id. If status is pending, it will be nil (put null or dont pass this field at all)
//         relevant_agency: ['Singapore Civil Defence','etc'], // same as above. Note that is an array
//         time_stamp: "XXXXXX",
//         status: '', // Pending|Ongoing|Resolved|Deleted???|Rejected . Can give Id also. I process at front end
//         reported_user: "John Cena", // based on user db
//         phone_no: "XXXXXXXXXX" // based on user db
//       }
//     },
//     {
//      // same as above.
//     }
//   ]
// }

// json response is in special format (known as geojson)
// data : {
//   type: "FeatureCollection", // standard
//   features: [ // standard
//     {
//       type: "Feature", // standard
//       geometry: { // standard
//         type: "Point", // standard
//         coordinates: [103.839, 1.375] // based on gov weather api. [lon,lat]. Note that is in an array
//       },
//       properties: { // standard
//         location: "Ang Mo Kio", // based on gov weather api. It is 'name' in gov weather api
//         forecast: "cloudy" // based on gov weather api. It is 'forecast' in gov weather api
//       }
//     },
//     {
//       ... // same as above. Multiple objects in the features array
//     }
//   ]
// }
