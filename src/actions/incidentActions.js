import { incidentConstants } from "../constants";
import { incidentService } from "../services";

export const getIncidents = () => async dispatch => {
  // const res = await axios.get("https://jsonplaceholder.typicode.com/users");

  // try {
  //   const data = await incidentService.getIncidents();
  //   dispatch({
  //     type: incidentConstants.GET_INCIDENTS,
  //     payload: data
  //   });
  // } catch (error) {
  //   console.log("ERROR!!! AT incidentActions");
  // }
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
