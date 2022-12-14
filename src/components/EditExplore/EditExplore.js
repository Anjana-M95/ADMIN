import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
export default function EditExplore() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const history = useHistory();
  const id = useParams().id;
  console.log(id);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleContent = (event) => {
    setContent(event.target.value);
  };
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + "/eachData", {
        params: { id },
      })
      .then((response) => {
        if (response.data.success) {
          console.log("response", response);
          setTitle(response.data.value[0].title);
          setContent(response.data.value[0].content);
        }
      });
  }, []);
  const Save = (event) => {
    axios
      .post(process.env.REACT_APP_URL + "/saveChanges", {
        Title: title,
        Content: content,
        id,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("response1", response);
          history.push("/explore");
        }
      });

    event.preventDefault();
  };
  const Back = () => {
    history.push("/explore");
  };
  return (
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
        <button
          className="save"
          style={{ backgroundColor: "#2e7d32", color: "white" }}
          onClick={Save}
        >
          Save Changes
        </button>
        <button
          className="Back"
          style={{ backgroundColor: "#2e7d32", color: "white" }}
          onClick={Back}
        >
          GO BACK
        </button>
      </div>
    </Box>
  );
}
