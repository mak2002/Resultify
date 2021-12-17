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
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";

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

export default function Register({ setcurrentUser }) {
  const classes = useStyles();

  const [registerEmail, setregisterEmail] = useState();
  const [registerPassword, setregisterPassword] = useState();

  const registerUser = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

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
    <div className={classes.root2}>
      <TextField
        className={classes.input}
        label="Username"
        onChange={(e) => setregisterEmail(e.target.value)}
      />
      <TextField
        className={classes.input}
        label="Password"
        type="password"
        onChange={(e) => setregisterPassword(e.target.value)}
      />

      <Button
        variant="contained"
        className={classes.button}
        onClick={registerUser}
      >
        Register
      </Button>

      <Button variant="contained" className={classes.button} onClick={logout}>
        Logout
      </Button>
      <h4> User Logged In: </h4>
      {user?.email}
    </div>
  );
}
