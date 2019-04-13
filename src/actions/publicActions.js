import { publicService } from "../services";

export const createIncident = incident => async dispatch => {
  try {
    const res = await publicService.createIncident();
  } catch (error) {
    console.log(error);
  }
};

export const subscribe = phoneNoPostalCode => async dispatch => {
  try {
    const res = await publicService.subscribe(phoneNoPostalCode);
  } catch (error) {
    console.log(error);
  }
};
