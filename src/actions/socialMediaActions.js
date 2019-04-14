import { socialMediaService } from "../services/";
export const postTwitter = message => async dispatch => {
  try {
    const res = await socialMediaService.postTwitter(message);
  } catch (error) {
    return new Promise.reject(false);
  }
};
