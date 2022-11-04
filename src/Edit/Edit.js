import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
export default function FormPropsTextFields() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();
    const id = useParams().id;
    console.log(id);

    const handleTitle = (event) => {
        setTitle(event.target.value);
    };
    const handleDescription = (event) => {
        setDescription(event.target.value);
    };
    useEffect(() => {
        axios
            .get(process.env.REACT_APP_BASEURL + "/eachData", {
                params: { id },
            })
            .then((response) => {
                if (response.data.success) {
                    console.log("response", response);
                    setTitle(response.data.value[0].title);
                    setDescription(response.data.value[0].description);
                }
            });
    }, []);
    const Save = (event) => {
        axios
            .post(process.env.REACT_APP_BASEURL + "/saveChanges", {
                Title: title,
                Description: description,
                id
            })
            .then((response) => {
                if (response.data.success) {
                    console.log("response1", response);
                    history.push("/Services")
                }
            });
        event.preventDefault();
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
                <TextField type={'text'}
                    id="filled-helperText"
                    label="Title"
                    value={title}
                    onChange={handleTitle}
                    variant="filled"
                />
            </div>
            <div>
                <TextField type={'text'}
                    id="standard-helperText"
                    label="Description"
                    value={description}
                    onChange={handleDescription}
                    variant="standard"
                />
            </div>
            <div>
                <button className="save" style={{ size: "medium", color: "white", backgroundColor: "#2e7d32", }} onClick={Save}>
                    Save Changes
                </button>
            </div>
        </Box>

    );
}
