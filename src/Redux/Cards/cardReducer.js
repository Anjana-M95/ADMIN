import { CARDS } from "./cardType";
const InitialState = {
  cardsData: [],
};

const cardReducer = (state = InitialState, action) => {
  switch (action.type) {
    case CARDS:
      return {
        ...state,
        cardsData: action.payload,
      };
    default:
      return state;
  }
};
export default cardReducer;
