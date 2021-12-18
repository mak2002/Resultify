import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Axios from "axios";
import {
  Container,
  Paper,
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

const useStyles = makeStyles({
  root: {
    height: "100vh",
  },
  grid: {
    width: "850px",
    margin: "20px auto",
  },
  grid2: {},
  textfield: {
    margin: "35px",
  },
  btn: {
    marginTop: "20px",
    marginLeft: "20%",
    width: "50%",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
  },
  select: {
    minWidth: "250px",
  },
});

export default function ShowMarks({ setGlobalTableData }) {
  const classes = useStyles();

  const columns1 = [];

  const [classname, setclassname] = useState("");
  const [semester, setsemester] = useState("");
  const [columnFields, setcolumnFields] = useState("");

  const [tableData, settableData] = useState("");

  columnFields &&
    columnFields.map((column) => {
      columns1.push({
        field: column.name,
        headerName: column.name.toUpperCase(),
        width: 1800 / columnFields.length,
      });
    });
  // setting class and semester values
  const [menuValueClass, setmenuValueClass] = useState("year1");
  const [menuValueSemester, setmenuValueSemester] = useState("sem1");

  // class value
  const handleChangeClass = (e) => {
    setmenuValueClass(e.target.value);
    setclassname(e.target.value);
  };

  // semester value
  const handleChangeSemester = (e) => {
    setmenuValueSemester(e.target.value);
    setsemester(e.target.value);
    console.log("menuValueSemester", menuValueSemester);
  };

  const handleClick = (e) => {

    // fetch marks from local database
    console.log("handle", menuValueSemester);
    Axios.get("http://localhost:5000/getmarks", {
      params: {
        menuValueClass: menuValueClass,
        menuValueSemester: menuValueSemester,
      },
    })
      .then((response) => response.data)
      .then((response) =>
        console.log(
          "response",
          console.log('marks: ',response),
          setcolumnFields(response.fields),
          settableData(response.rows),
          setGlobalTableData(response.rows)
        )
      );
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3">Show Results</Typography>
      {/* <h1>Show Results</h1> */}

      <Select
        value={menuValueClass || ""}
        className={classes.select}
        onChange={handleChangeClass}
        disableUnderline
      >
        <MenuItem value={"year1"}>Year 1</MenuItem>
        <MenuItem value={"year2"}>Year 2</MenuItem>
        <MenuItem value={"year3"}>Year 3</MenuItem>
        <MenuItem value={"year4"}>Year 4</MenuItem>
      </Select>

      <Select
        // value={menuValueSemester || ""}
        className={classes.select}
        value={menuValueSemester}
        onChange={handleChangeSemester}
        disableUnderline
      >
        <MenuItem value={"sem1"}>Sem 1</MenuItem>
        <MenuItem value={"sem2"}>Sem 2</MenuItem>
      </Select>

      <Button onClick={handleClick}>Get Marks</Button>
      {tableData ? <Button>Visualize Marks</Button> : null}

      {tableData ? (
        (
          <DataGrid
            rows={tableData}
            columns={columns1}
            pageSize={15}
            disableSelectionOnClick
          />
        )  
      ) : (
        <h1>Select Table From Menu Above</h1>
      )}
    </div>
  );
}
