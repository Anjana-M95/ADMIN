import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
export default function EditImage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState();
  const id = useParams().id;
  console.log(id);

  const dataForm = new FormData();
  dataForm.append("title", title);
  dataForm.append("image", image);

  const handleTitle = (event) => {
    setTitle(event.target.value);
    setNewTitle(event.target.value);
  };
  const handleImage = (event) => {
    const image = event.target.files[0];
    setImage(image);
    //    setNewImage(image);
  };
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + "/eachImage", {
        params: { id },
      })
      .then((response) => {
        console.log("response", response);
        setNewTitle(response.data.value[0].title);
        setNewImage(response.data.value[0].image);
      });
  }, []);
  const saveImage = (event) => {
    axios
      .post(process.env.REACT_APP_URL + "/saveImage", dataForm, {
        headers: { "Content-Type": "multipart/form-data" },
        params: { id },
      })
      .then((response) => {
        if (response.data.success) {
          console.log("response1", response);
          toast("Succesfully saved");
        }
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
              value={newTitle}
              onChange={handleTitle}
              variant="filled"
            />
          </div>
          <div>
            <img
              src={"http://localhost:3001/uploads/" + newImage}
              alt="nil"
              width="300"
              height="300"
            />
            <TextField
              name="upload-photo"
              type="file"
              id="standard-helperText"
              label="Image"
              onChange={handleImage}
              variant="standard"
            ></TextField>
          </div>
        </form>
        <div>
          <Button
            className="add"
            color="primary"
            variant="contained"
            onClick={saveImage}
          >
            Save Image
          </Button>
        </div>
      </Box>
    </>
  );
}
