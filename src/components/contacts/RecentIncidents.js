import React, { Component } from "react";
import Contact from "./Contact";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getContacts } from "../../actions/contactActions";
class RecentIncidents extends Component {
    componentDidMount() {
        this.props.getContacts();
    }

    render() {
        const { contacts } = this.props;
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
RecentIncidents.propTypes = {
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
)(RecentIncidents);
