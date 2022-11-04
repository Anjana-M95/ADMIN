import { EXPLORE } from "./ExploreType";
export const explore = (data) => {
  return {
    type: EXPLORE,
    payload: data,
  };
};
