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
  root1: {
    display: "flex",
    // height: "35%",
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

export default function Login({ setcurrentUser }) {
  const classes = useStyles();

  const [loginEmail, setloginUsername] = useState();
  const [loginPassword, setloginPassword] = useState();

  const handleSignInButton = (e) => {
    // setregister(!)
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
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
    <div className={classes.root1}>
      <div className={classes.login_form}>
        <TextField
          className={classes.input}
          label="Email"
          onChange={(e) => setloginUsername(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Password"
          type="password"
          onChange={(e) => setloginPassword(e.target.value)}
        />
      </div>
      <Button variant="contained" className={classes.button} onClick={login}>
        Login
      </Button>
      <Button variant="contained" className={classes.button} onClick={logout}>
        Logout
      </Button>
      <h4> User Logged In: </h4>
      {user?.email}
    </div>
  );
}
