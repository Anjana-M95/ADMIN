import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AddExplore() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const id = useParams().id;
  console.log(id);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleContent = (event) => {
    setContent(event.target.value);
  };

  const add = (event) => {
    axios
      .post(process.env.REACT_APP_URL + "/add", {
        title: title,
        content: content,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("response1", response);
          toast("Content is saved");
          setTitle("");
          setContent("");
        } else {
          toast.error(response.data.msg);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
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
        <div>
          <TextField
            type={"text"}
            id="filled-helperText"
            label="Title"
            value={title}
            onChange={handleTitle}
            variant="filled"
          />
        </div>
        <div>
          <TextField
            type={"text"}
            id="standard-helperText"
            label="Content"
            value={content}
            onChange={handleContent}
            variant="standard"
          />
        </div>
        <div>
          <Button
            className="add"
            color="primary"
            variant="contained"
            onClick={add}
          >
            Add Content
          </Button>
        </div>
      </Box>
    </>
  );
}
