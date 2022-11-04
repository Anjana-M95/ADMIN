import axios from "axios";
import { deletedata } from "../../Redux/Delete/DeleteAction";
import ExploreAPI from "./ExploreAPI";

function dataDeleteAPI(id) {
  return function (dispatch) {
    axios
      .get(process.env.REACT_APP_URL + "/delete", {
        params: { id },
      })
      .then((data) => {
        if (data.data.success) {
          dispatch(ExploreAPI());
          console.log("response", data);
          dispatch(deletedata(data.data.value));
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
}
export default dataDeleteAPI;
