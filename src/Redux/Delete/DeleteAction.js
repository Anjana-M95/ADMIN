import { DELETE } from "./DeleteType";
export const deletedata = (data) => {
  console.log("action");
  return {
    type: DELETE,
    payload: data,
  };
};
