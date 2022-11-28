import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, makeStyles } from "@material-ui/core";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import imageDeleteAPI from "../API/imageDeleteAPI";
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import cardsAPI from "../API/cardsAPI";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tablehead: {
    backgroundColor: "skyblue",
  },
});

export default function Cards() {
  //   const [cards, setCards] = React.useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const cards = useSelector((state) => state.cardsList.cardsData);
  React.useEffect(() => dispatch(cardsAPI()), []);
  const handleDelete = (id) => {
    dispatch(imageDeleteAPI(id));
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ margin: "auto", width: "70%" }} aria-label="simple table">
        <TableHead className={classes.tablehead}>
          <TableRow>
            <TableCell align="right">SlNo</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cards &&
            cards.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" align="right">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">
                  {" "}
                  <Box
                    component="img"
                    sx={{
                      height: 80,
                      width: 100,
                      maxHeight: { xs: 80, md: 167 },
                      maxWidth: { xs: 100, md: 250 },
                    }}
                    alt="Nil."
                    src={"http://localhost:3001/uploads/" + row.image}
                  />
                </TableCell>
                <TableCell align="center">
                  <>
                    <Button
                      size="medium"
                      variant="contained"
                      color="primary"
                      className="editbutton"
                      onClick={() => history.push(`/editImage/${row.id}`)}
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
                      onClick={() => history.push("/addImage")}
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
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Button
        type="submit"
        size="medium"
        color="info"
        variant="contained"
        className="addbutton"
        onClick={() => history.push("/addImage")}
      >
        ADD ROWS
      </Button>
    </TableContainer>
  );
}
