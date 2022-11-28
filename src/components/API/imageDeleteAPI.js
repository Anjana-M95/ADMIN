import axios from "axios";
import { deleteImage } from "../../Redux/deleteImage/deleteImageAction";
import cardsAPI from "./cardsAPI";

function imageDeleteAPI(id) {
  return function (dispatch) {
    axios
      .get(process.env.REACT_APP_URL + "/deleteImage", {
        params: { id },
      })
      .then((data) => {
        if (data.data.success) {
          dispatch(cardsAPI());
          console.log("response", data);
          dispatch(deleteImage(data.data.value));
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
}
export default imageDeleteAPI;
