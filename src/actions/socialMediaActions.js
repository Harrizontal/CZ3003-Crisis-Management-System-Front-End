import { socialMediaService } from "../services/";
export const postTwitter = (message, socialmediatarget) => async dispatch => {
  try {
    const res = await socialMediaService.postTwitter(
      message,
      socialmediatarget
    );
  } catch (error) {
    return new Promise.reject(false);
  }
};
