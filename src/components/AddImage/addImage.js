import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AddImage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();

  const addImage = (event) => {
    const dataForm = new FormData();
    dataForm.append("title", title);
    dataForm.append("image", image);
    console.log(image, "image");
    console.log(dataForm, "dataForm");
    axios
      .post(process.env.REACT_APP_URL + "/addImage", dataForm, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        if (response.data.success) {
          console.log("response1", response);
          toast("Image is saved");
          setTitle("");
          setImage("");
        }
      })
      .catch((err) => {
        toast.error(err.response.msg);
      });
    event.preventDefault();
  };

  return (
    <>
      <ToastContainer />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 4, width: "100ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <form encType="multipart/form-data">
          <div>
            <TextField
              type={"text"}
              outlined-basic
              label="title"
              // value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              variant="filled"
            />
          </div>
          <div>
            <img src={"https://localhost:3001/uploads/" + image} alt="Nil" />
            <TextField
              name="upload-photo"
              type="file"
              id="standard-helperText"
              label="Image"
              // value={file}
              onChange={(event) => {
                const image = event.target.files[0];
                setImage(image);
              }}
              variant="standard"
            ></TextField>
          </div>
        </form>
        <div>
          <Button
            className="add"
            color="primary"
            variant="contained"
            onClick={addImage}
          >
            Add Image
          </Button>
        </div>
      </Box>
    </>
  );
}
