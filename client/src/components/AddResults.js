import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "tailwindcss/tailwind.css";
import Axios from "axios";

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

  // feature to be implemented
  const handleClick = () => {
    console.log("clicked");
    Axios.put("http://localhost:5000/import_csv", {
      filePath: filePath,
      tableName: tableName,
    }).then((response) => {
      console.log("success", response.data.rows);
    });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3" color="secondary">
        Add Result
      </Typography>

      <div className={classes.wrapper}>
        <TextField
          className={classes.textfield}
          label="Enter File Path"
          onChange={(e) => setfilePath(e.target.value)}
        />
        <TextField
          className={classes.textfield}
          label="Enter Table Name"
          onChange={(e) => settableName(e.target.value)}
        />

        <TextField className={classes.textfield} label="Enter columns names" />

        <br />
        <br />
      </div>

      <Button onClick={handleClick}>Import Table</Button>
    </div>
  );
}
