import axios from "axios";
import { explore } from "../../Redux/Explore/ExploreAction";

function exploreAPI() {
  return function (dispatch) {
    axios
      .get(process.env.REACT_APP_URL + "/details")
      .then((data) => {
        console.log("data", data);
        dispatch(explore(data.data.value));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
}
export default exploreAPI;
