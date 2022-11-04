import { DELETE } from "./DeleteType";

const InitialState = {
  value: [],
};
const DeleteReducer = (state = InitialState, action) => {
  console.log("reducer");
  switch (action.type) {
    case DELETE:
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};
export default DeleteReducer;
