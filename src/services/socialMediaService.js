import { Config } from "../Config";
import axios from "axios";
import { incidentData } from "../components/map/map-style";
const url = Config.SERVER_URL;

export const socialMediaService = {
  postTwitter
};

function postTwitter(message) {
  var configHeader = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token").slice(1, -1)
    }
  };
  return axios
    .post(url + "/twitter", message, configHeader)
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      return undefined;
    });
}
