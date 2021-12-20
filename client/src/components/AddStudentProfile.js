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

import InputAdornment from "@material-ui/core/InputAdornment";
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import AccountCircle from '@material-ui/icons/AccountCircle';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    maxHeight: "100vh",
    // backgroundColor: "#5BBCB6"
  },
  grid: {
    width: "900px",
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
    minWidth: "150px",
  },
  // wrapper: {
  //     backgroundColor: '#888888',
  //     // boxShadow: 5px 10px 8px #888888,
  //     boxShadow: '5px 10px 8px #888888',
  // }
});

export default function AddStudentProfile() {
  const classes = useStyles();

  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [rollno, setrollno] = useState();
  const [classname, setclassname] = useState();
  const [year, setyear] = useState();
  const [studentsList, setstudentsList] = useState([]);
  const [menuValue, setmenuValue] = useState("class1");
  const [id, setid] = useState();

  // add student to local database
  const addStudent = () => {
    Axios.post("http://localhost:5000/addStudent", {
      id: id,
      firstName: firstName,
      lastName: lastName,
      rollno: rollno,
      classname: classname,
      year: year,
      menuValueYear: menuValueYear,
      menuValueSemester: menuValueSemester,
    }).then(() => {
      console.log("success");
    });
  };

  const handleChange = (e) => {
    setmenuValue(e.target.value);
    setclassname(e.target.value);
  };

  const logout = async () => {
    await signOut(auth);
  };

  // setting class and semester values
  const [menuValueYear, setmenuValueYear] = useState("year1");
  const [menuValueSemester, setmenuValueSemester] = useState("sem1");
  const [semester, setsemester] = useState("");

  // class value
  const handleChangeClass = (e) => {
    setmenuValueYear(e.target.value);
    setclassname(e.target.value);
  };

  // semester value
  const handleChangeSemester = (e) => {
    setmenuValueSemester(e.target.value);
    setsemester(e.target.value);
    console.log("menuValueSemester", menuValueSemester);
  };

  return (
    <div className={classes.root}>
      <div className="wrapper" className={classes.wrapper}>
        <Grid className={classes.grid}>
          <Grid className={classes.grid2}>
            <h2>Enter Students Details</h2>
          </Grid>

          <form className={classes.form}>
            <TextField
              onChange={(e) => setid(e.target.value)}
              label="ID"
              className={classes.textfield}
              
            />

            <TextField
              onChange={(e) => {
                setfirstName(e.target.value);
              }}
              className={classes.textfield}
              label="First Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
              ),
            }}
            />
            <TextField
              onChange={(e) => {
                setlastName(e.target.value);
              }}
              className={classes.textfield}
              label="Last Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
              ),
            }}
            />
            <TextField
              onChange={(e) => {
                setrollno(e.target.value);
              }}
              className={classes.textfield}
              label="Roll No"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FormatListNumberedRtlIcon />
                  </InputAdornment>
              ),
            }}
            />

            <TextField
              onChange={(e) => {
                setyear(e.target.value);
              }}
              className={classes.textfield}
              label="YEAR"
            />

            {/* {<label>Class</label>} */}
            <Select
              value={menuValueYear || ""}
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

            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={addStudent}
            >
              Add
            </Button>
          </form>
        </Grid>
      </div>
    </div>
  );
}
