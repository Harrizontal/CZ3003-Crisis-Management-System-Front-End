import React from "react";
import PropTypes from "prop-types";
import logo from "./siren.png";

const Header = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} width="auto" height="100%" />
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
