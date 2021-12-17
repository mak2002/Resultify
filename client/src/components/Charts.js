import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
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

export default function Charts() {
  const [studentDetails, setstudentDetails] = useState([10, 20]);
  const [sem4, setsem4] = useState();
  const [allSems, setallSems] = useState();

  const [menuValueClass, setmenuValueClass] = useState("year1");
  const [menuValueSemester, setmenuValueSemester] = useState("sem1");

  const [totalMarks, settotalMarks] = useState();

  // const [menuValueClass, setmenuValueClass] = useState("");
  // const [menuValueSemester, setmenuValueSemester] = useState("");
  const [semester, setsemester] = useState("");
  const [classname, setclassname] = useState("");
  const [rollno, setrollno] = useState(1001);
  const [studentName, setstudentName] = useState();

  var totalMarksList = [];

  useEffect(() => {
    console.log("allSems: ", allSems);
    return individualStudents;
  }, []);

  const classes = useStyles();

  var data1;

  var individualStudents = [];

  // const handleChangeClass = (e) => {
  //   setmenuValueClass(e.target.value);
  //   setclassname(e.target.value);
  // };

  // const handleChangeSemester = (e) => {
  //   setmenuValueSemester(e.target.value);
  //   setsemester(e.target.value);
  // };

  const handleRollNoChange = (e) => {
    setrollno(e.target.value);
    // setallSems([sem1, sem2, sem3, sem4]);
  };
  var totalValue;

  const handleClick = () => {
    // setallSems([sem1, sem2, sem3, sem4]);
    console.log("clicked", menuValueSemester, menuValueClass);
  };

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

  const data = {
    labels: ["Sem1", "Sem2"],
    datasets: [
      {
        label: "# of Votes",
        data: studentDetails,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  var datalength = false;

  return (
    <div>
      <Typography variant="h2" color="secondary">
        Charts
      </Typography>

      <TextField label="Roll.No." />

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

      <Line
        data={data}
        options={{ maintainAspectRatio: true }}
        height={10}
        width={20}
      />
    </div>
  );
}
