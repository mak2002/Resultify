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
  root1: {
    display: "flex",
    height: "35%",
    width: "20%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #000",
  },
  input: {
    margin: "15px",
  },
  button: {
    marginTop: "40px",
  },
  login_form: {
    display: "flex",
    flexDirection: "column",
  },
});

export default function Login({ setregister }) {
  const classes = useStyles();

  const handleSignInButton = (e) => {
    // setregister(!)
  };

  return (
    <div className={classes.root1}>
      <div className={classes.login_form}>
        <TextField className={classes.input} label="Username" />
        <TextField className={classes.input} label="Password" type="password" />
      </div>
      <Button variant="contained" className={classes.button}>Login</Button>

    </div>
  );
}
