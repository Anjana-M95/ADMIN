import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";
import "./Services.css";
import axios from "axios";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  table: {
    margin: "auto",
    width: "100%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tablehead: {
    backgroundColor: "skyblue",
  },
});
//make styles
export default function BasicTable() {
  const [rows, setRows] = useState("");
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASEURL + "/exploreService")
      .then((response) => {
        if (response.data.success) {
          console.log("response", response);
          setRows(response.data.value);
        }
      });
  }, []);
  return (
    <div className="table">
      <TableContainer
        component={Paper}
        sx={{ width: "900px" }}
        className={classes.container}
      >
        <Table aria-label="simple table" className={classes.table}>
          <TableHead className={classes.tablehead}>
            <TableRow>
              <TableCell align="right">Id</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="right">
                    <button
                      size="medium"
                      variant="contained"
                      className="editbutton"
                      onClick={() => history.push(`/edit/${row.id}`)}
                    >
                      Edit
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
