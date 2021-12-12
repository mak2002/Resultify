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
import Login from "./Login";
import Register from "./Register";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
  },
  two_buttons: {
    margin: "10px",
    display: "flex",
    justifyContent: "space-between",
    // borderBottom:'1px solid #000'
    // position: "relative",
    // top: "40",
  },
  button: {
    marginLeft: "10px",
  },
});

export default function LoginOrRegister() {
  const [register, setregister] = useState(true);
  const classes = useStyles();

  const handleSignInButton = () => {
    setregister(false);
  };

  const handleRegisterButton = () => {
    setregister(true);
  };
  return (
    <div className={classes.root}>
      <div className={classes.two_buttons}>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={handleSignInButton}
        >
          Sign In
        </Button>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={handleRegisterButton}
        >
          Register
        </Button>
      </div>
      {register ? <Register /> : <Login setregister={setregister} />}
    </div>
  );
}
