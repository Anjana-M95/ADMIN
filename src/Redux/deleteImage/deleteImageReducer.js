import { DELETEIMAGE } from "./deleteImageType";

const InitialState = {
  value: [],
};
const DeleteReducer = (state = InitialState, action) => {
  console.log("reducer");
  switch (action.type) {
    case DELETEIMAGE:
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};
export default DeleteReducer;
