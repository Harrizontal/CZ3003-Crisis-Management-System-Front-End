import { incidentConstants } from "../constants";
import { incidentService } from "../services";

export const getIncidents = () => async dispatch => {
  try {
    //const res = await incidentService.getIncidents();
    console.log("dispatch @ getIncidents");
    const res = await incidentService.getIncidents();

    dispatch({
      type: incidentConstants.GET_INCIDENTS,
      payload: res.data.data
    });
  } catch (error) {
    console.log("IncidentActions:Getincident->" + error);
  }
};

export const getIncident = id => async dispatch => {
  try {
    //const res = await incidentService.getIncidents();
    console.log("dispatch @ getIncidents");
    const res = await incidentService.getIncidents();

    dispatch({
      type: incidentConstants.GET_INCIDENTS,
      payload: res.data.data
    });
  } catch (error) {
    console.log("IncidentActions:Getincident->" + error);
  }
};
export const updateIncident = id => async dispatch => {};

export const addIncident = incident => async dispatch => {};
