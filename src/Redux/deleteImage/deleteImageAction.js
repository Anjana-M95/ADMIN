import { DELETEIMAGE } from "./deleteImageType";
export const deleteImage = (data) => {
  console.log("action");
  return {
    type: DELETEIMAGE,
    payload: data,
  };
};
