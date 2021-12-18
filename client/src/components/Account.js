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

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
},
main: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    // margin: "15px",
  },
  button: {
    margin: "10px",
  },
});

export default function Account({ setcurrentUser }) {
  const classes = useStyles();
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    console.log("currentUser", currentUser);
    setUser(currentUser);
    setcurrentUser(currentUser);
  });

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <Typography variant="h4"> User Email: </Typography>
        <h2> {user?.email}</h2>

        <Button
          onClick={logout}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
