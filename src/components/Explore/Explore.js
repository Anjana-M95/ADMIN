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
import "./Explore.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import exploreAPI from "../API/ExploreAPI";
import dataDeleteAPI from "../API/DataDeleteAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

//make Styles

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

export default function ExploreTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.exploreList.exploreData);
  useEffect(() => dispatch(exploreAPI()), []);

  const handleDelete = (id) => {
    dispatch(dataDeleteAPI(id));
    toast("successfully deleted");
  };

  console.log(searchQuery);

  const search = rows.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(search, "search");
  // const search = (data) => {
  //   return data.filter((item) =>
  //     item.title.toLowerCase().includes(searchQuery)
  //   );
  // };
  // return rows.filter((row) => {
  //   return searchParam.some((newRow) => {
  //     return (
  //       row[newRow]
  //         .toString()
  //         .toLowerCase()
  //         .indexOf(searchQuery.toLowerCase()) > -1
  //     );
  //   });
  // });

  return (
    <div className="main">
      <div className="search">
        <form>
          <TextField
            sx={{ width: "300px" }}
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search"
            value={searchQuery}
            placeholder="Search..."
            size="small"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "black" }} />
          </IconButton>
        </form>
      </div>

      <div className="table">
        <ToastContainer />
        <TableContainer
          component={Paper}
          sx={{ width: "1000px" }}
          className={classes.container}
        >
          <Table aria-label="simple table" className={classes.table}>
            <TableHead className={classes.tablehead}>
              <TableRow>
                <TableCell align="right">Sl.No.</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {search &&
                search.map((row, index) => (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    {" "}
                    <TableCell align="right">{index + 1}</TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{row.content}</TableCell>
                    <TableCell align="right">
                      <div className="Actions">
                        <>
                          <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            className="editbutton"
                            onClick={() => history.push("/editexplore/:id")}
                          >
                            EDIT
                          </Button>
                        </>
                        <>
                          <Button
                            type="submit"
                            size="medium"
                            color="info"
                            variant="contained"
                            className="addbutton"
                            onClick={() => history.push("/addexplore")}
                          >
                            ADD
                          </Button>
                        </>
                        <>
                          <Button
                            type="submit"
                            key={row.id}
                            size="medium"
                            color="secondary"
                            variant="contained"
                            className="deletebutton"
                            onClick={() => handleDelete(row.id)}
                          >
                            DELETE
                          </Button>
                        </>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
