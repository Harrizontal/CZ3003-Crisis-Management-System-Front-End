import React from "react";
import PropTypes from "prop-types";
import logo from "./cystemlogo.svg";

const Header = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img className="logo1" src={logo} width="125px" height="100%"/>
    </div>
  );
};

Header.defaultProps = {
  branding: "My App"
};

Header.propTypes = {
  branding: PropTypes.string.isRequired
};

export default Header;
