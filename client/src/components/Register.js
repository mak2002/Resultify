import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Axios from "axios";

const useStyles = makeStyles({
  root2: {
    display: "flex",
    flexDirection: "column",
    width: "20%",
    height: "35%",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #000",
    border: "1px solid #000",
  },
  input: {
    margin: "15px",
  },
  button: {
    marginTop: "40px",
  },
});

export default function Register() {
  const classes = useStyles();

  return (
    <div className={classes.root2}>
      <TextField className={classes.input} label="Username" />
      <TextField className={classes.input} label="Password" type="password" />
      <TextField
        className={classes.input}
        label="Confirm Password"
        type="password"
      />
      <Button variant="contained" className={classes.button}>Register</Button>
    </div>
  );
}
