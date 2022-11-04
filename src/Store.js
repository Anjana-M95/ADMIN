import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { RootReducer } from "./RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
