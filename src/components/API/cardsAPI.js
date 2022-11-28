import axios from "axios";
import { cards } from "../../Redux/Cards/cardAction";

function cardsAPI() {
  return function (dispatch) {
    axios
      .get(process.env.REACT_APP_URL + "/cards")
      .then((data) => {
        console.log("data", data);
        dispatch(cards(data.data.value[0]));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
}
export default cardsAPI;
