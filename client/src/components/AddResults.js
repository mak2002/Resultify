import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "tailwindcss/tailwind.css";
import Axios from "axios";

const csv = require("csv-parser");
const fs = require("fs");

const useStyles = makeStyles({
  root: {
    height: "100vh",
  },
  textfield: {
    margin: "20px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
});

export default function AddResults() {
  const classes = useStyles();

  const [filePath, setfilePath] = useState();
  const [tableName, settableName] = useState();
  const [columnNames, setcolumnNames] = useState([]);
  const [columnTypes, setcolumnTypes] = useState("");
  const [columnTypesArray, setcolumnTypesArray] = useState([]);

  // feature to be implemented
  const handleClick = () => {
    console.log("clicked");
    console.log("handleClick columnTypes: ", columnTypesArray);
    Axios.put("http://localhost:5000/import_table", {
      filePath: filePath,
      tableName: tableName,
      columnTypesArray: columnTypesArray,
      columnNames: columnNames,
    });
  };

  // send file path and the name to be given and get the column names of CSV file
  const uploadCsv = () => {
    Axios.put("http://localhost:5000/upload_csv", {
      filePath: filePath,
      tableName: tableName,
    }).then(
      (response) => {
        console.log("success", response.data);
        setcolumnNames(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // set column types
  const handleColumnTypesChange = (e) => {
    setcolumnTypes(e.target.value);
  };

  // update column types array
  useEffect(() => {
    var initialColumnTypes = columnTypes.trim().split(",");
    setcolumnTypesArray(initialColumnTypes);
    console.log("columnTypes: ", columnTypesArray);
  }, [columnTypes]);

  return (
    <div className={classes.root}>
      <Typography variant="h3" color="secondary">
        Add Result
      </Typography>

      <div className={classes.wrapper}>
        <TextField
          className={classes.textfield}
          label="Enter File Path"
          autoComplete="true"
          onChange={(e) => setfilePath(e.target.value)}
        />
        <TextField
          className={classes.textfield}
          label="Enter Table Name"
          onChange={(e) => settableName(e.target.value)}
        />

        <TextField
          value={columnNames}
          className={classes.textfield}
          label="Columns names are"
        />

        <TextField
          value={columnTypes}
          className={classes.textfield}
          label="Enter Column types "
          onChange={handleColumnTypesChange}
        />

        <br />
        <br />
      </div>

      <Button onClick={uploadCsv}>Upload CSV</Button>
      <Button onClick={handleClick}>Import Table</Button>
    </div>
  );
}
