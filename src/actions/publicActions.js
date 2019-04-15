import { publicService } from "../services";
import { incidentConstants } from "../constants";

export const createIncident = incident => dispatch => {
  return publicService.createIncident(incident).then(
    data => {
      if (data["msg"]) {
        return true;
      } else {
        // got error
        return Promise.reject(false);
      }
    },
    error => {
      return Promise.reject(false);
    }
  );
};

export const subscribe = phoneNoPostalCode => async dispatch => {
  try {
    const res = await publicService.subscribe(phoneNoPostalCode);
  } catch (error) {
    console.log(error);
  }
};

export const accessPublicAgencyLink = id => dispatch => {
  return publicService.accessLinkRelevantAgency(id).then(
    data => {
      if (data) {
        console.log(data);
        dispatch({
          type: incidentConstants.GET_INCIDENT,
          payload: data
        });
        return true;
      }
    },
    error => {
      return Promise.reject(error);
    }
  );
};

export const approveIncidentLink = id => dispatch => {
  return publicService.approveIncidentRelevantAgency(id).then(
    data => {
      if (data) {
        console.log(data);
        return true;
      } else {
        console.log(data);
      }
    },
    error => {
      console.log(error);
      return Promise.reject(error);
    }
  );
};
