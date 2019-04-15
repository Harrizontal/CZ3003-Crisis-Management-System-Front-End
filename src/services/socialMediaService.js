import { Config } from "../Config";
import axios from "axios";
const url = Config.SERVER_URL;

export const socialMediaService = {
  postTwitter
};

function postTwitter(message, socialmediatarget) {
  var body = {
    message: message,
    social_media_target: socialmediatarget
  };
  console.log(body);
  var configHeader = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token").slice(1, -1)
    }
  };
  return axios
    .post(url + "/socialmedia", body, configHeader)
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      throw error.response.status;
    });
}
