import React, { Component } from "react";
import Contact from "./Contact";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getContacts } from "../../../../actions/contactActions";

class Contacts extends Component {
  componentDidMount() {
    console.log("componentDidMount");
    this.props.getContacts();
    const { contacts } = this.props;
    console.log(contacts);
  }

  render() {
    console.log(this.props);
    const { contacts } = this.props;
    console.log(contacts);
    return (
      <React.Fragment>
        <h1 className="display-4 mb-2">
          <span className="text-danger">Contact</span> List
        </h1>
        {contacts.map(contact => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </React.Fragment>
    );
  }
}
Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  getContacts: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  contacts: state.contact.contacts
  // able to accept from this.props.contacts
});

export default connect(
  mapStateToProps,
  { getContacts }
)(Contacts);
