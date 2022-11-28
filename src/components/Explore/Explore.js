import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { visuallyHidden } from "@mui/utils";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import exploreAPI from "../API/ExploreAPI";
import dataDeleteAPI from "../API/DataDeleteAPI";
import { Button } from "@mui/material";
import "./Explore.css";
import { toast, ToastContainer } from "react-toastify";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  tablehead: {
    backgroundColor: "skyblue",
  },
});

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "slno",
    label: "SlNo",
  },
  {
    id: "title",
    label: "Title",
  },
  {
    id: "content",
    label: "Description",
  },

  {
    id: " action",
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const classes = useStyles();

  return (
    <TableHead className={classes.tablehead}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              align="center"
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.exploreList.exploreData);
  React.useEffect(() => dispatch(exploreAPI()), []);

  const handleDelete = (id) => {
    dispatch(dataDeleteAPI(id));
    toast("successfully deleted");
  };
  const search = rows.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(search, "search");
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    console.log(property, "property");
  };

  return (
    <div className="search">
      <ToastContainer />
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
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ width: 1000, margin: "auto" }}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(search, getComparator(order, orderBy)).map(
                  (row, index) => {
                    return (
                      <TableRow>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {index + 1}
                        </TableCell>
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
                                onClick={() =>
                                  history.push(`/editexplore/${row.id}`)
                                }
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
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
}
