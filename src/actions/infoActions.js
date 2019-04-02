import { infoConstants as constants } from "../constants";
import { infoService } from "../services";

export const getMapData = () => async dispatch => {
  try {
    console.log("action @ getMapData");
    const res = await infoService.getDengueClusterMap();

    console.log("res done");
    console.log(res);
    dispatch({
      type: constants.GET_MAP_DATA,
      payload: res
    });
  } catch (error) {
    console.log("GetMapData" + error);
  }
};
