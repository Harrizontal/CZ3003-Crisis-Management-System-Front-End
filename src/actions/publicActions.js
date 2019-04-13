import { publicService } from "../services";

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
      return Promise.reject(error);
    }
  );

  function success(user) {
    return { type: "asdasdasd", user };
  }

  function failure(error) {
    return { type: "asdasdasd", error };
  }
};

export const subscribe = phoneNoPostalCode => async dispatch => {
  try {
    const res = await publicService.subscribe(phoneNoPostalCode);
  } catch (error) {
    console.log(error);
  }
};
