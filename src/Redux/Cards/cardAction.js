import { CARDS } from "./cardType";
export const cards = (data) => {
  return {
    type: CARDS,
    payload: data,
  };
};
