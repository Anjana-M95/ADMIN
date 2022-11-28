import { combineReducers } from "redux";
import cardReducer from "./Redux/Cards/cardReducer";
import ExploreReducer from "./Redux/Explore/ExploreReducer";
export const RootReducer = combineReducers({
  exploreList: ExploreReducer,
  cardsList: cardReducer,
});
