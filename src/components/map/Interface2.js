import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Immutable from "immutable";
import { changeOverview } from "../../actions/mapActions";

class Interface2 extends Component {
  constructor(props) {
    super(props);

    this.buttons = [
      { value: "dengue", contents: "Dengue Cluster" },
      { value: "weather", contents: "Weather" },
      { value: "psi", contents: "PSI" }
    ];
  }

  componentWillUpdate(nextProps) {
    console.log(nextProps);
  }
  // Makes a button that triggers the CHANGE_VIZ action
  // with a provided value.
  _makeButton(activeState, btnData) {
    const { value, contents } = btnData;
    return (
      <button
        value={value}
        type="button"
        style={style.button}
        onClick={this.props.changeOverview}
        key={value}
      >
        {contents}
      </button>
    );
  }

  render() {
    const { activeButton } = this.props;
    // make all the buttons:
    const buttons = this.buttons.map(btn =>
      this._makeButton(activeButton, btn)
    );

    return (
      <div id="ui" style={style.ui}>
        <div>{buttons}</div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeOverview: changeOverview
    },
    dispatch
  );
}
function mapStateToProps(state) {
  return {
    activeButton: state.userInterface.get("activeButton"),
    mapInformation: state.overviewInformation
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Interface2);

const style = {
  ui: {
    zIndex: 4,
    position: "absolute",
    right: "10px",
    top: "10px"
  },
  button: {
    marginRight: "2px"
  }
};
