import { incidentConstants } from "../constants";
import { incidentService } from "../services";

export const getIncidents = () => async dispatch => {
  try {
    console.log("dispatch @ getIncidents");
    const res = await incidentService.getIncidents();

    dispatch({
      type: incidentConstants.GET_INCIDENTS,
      payload: res
    });
  } catch (error) {
    console.log("IncidentActions:Getincident->" + error);
  }
};

export const getIncident = id => async dispatch => {
  try {
    const res = await incidentService.getIncident(id);

    dispatch({
      type: incidentConstants.GET_INCIDENT,
      payload: res
    });
  } catch (error) {
    console.log("IncidentActions:Getincident->" + error);
  }
};
export const updateIncident = id => async dispatch => {};

export const addIncident = incident => dispatch => {
  return incidentService.addIncident(incident).then(
    data => {
      if (data["msg"]) {
        return true;
      } else {
        // got error
        return Promise.reject(false);
      }
    },
    error => {
      return Promise.reject(error);
    }
  );
};
