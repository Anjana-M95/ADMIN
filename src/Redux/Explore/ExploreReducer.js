import { EXPLORE } from "./ExploreType";
const InitialState = {
  exploreData: [],
};

const ExploreReducer = (state = InitialState, action) => {
  switch (action.type) {
    case EXPLORE:
      return {
        ...state,
        exploreData: action.payload,
      };
    default:
      return state;
  }
};
export default ExploreReducer;
