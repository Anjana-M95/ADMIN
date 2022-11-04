import { combineReducers } from "redux";
import ExploreReducer from "./Redux/Explore/ExploreReducer";
export const RootReducer = combineReducers({
  exploreList: ExploreReducer,
});
