import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
class NotFound extends Component{
  onSubmit = e => {
    e.preventDefault();
    this.props.history.goBack();
  }
  render() {
    return (
      <div className="bg404">
        <div className="containerNF">
          <div className="e404">The page you were looking for doesn't exist</div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="buttonNF"
            onClick={e => this.onSubmit(e)}
            >
            Click here to return
          </Button>
        </div>      
      </div>     
    );
  };
}
export default (NotFound);
  
