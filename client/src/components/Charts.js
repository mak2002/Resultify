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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Scatter } from "react-chartjs-2";

import { CategoryScale, LinearScale, BarElement, Title } from "chart.js";
// import { Bar } from 'react-chartjs-2';

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
    maxHeight: "100vh",
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
  scatter: {
    width: "50%",
    display: "flex",
    flexWrap: "wrap",
  },
});

export default function Charts({ GlobalTableData }) {
  const [studentDetails, setstudentDetails] = useState([10, 20]);
  const [sem4, setsem4] = useState();
  const [allSems, setallSems] = useState();

  const [menuValueClass, setmenuValueClass] = useState("year1");
  const [menuValueSemester, setmenuValueSemester] = useState("sem1");

  const [totalMarks, settotalMarks] = useState();

  const [semester, setsemester] = useState("");
  const [classname, setclassname] = useState("");
  const [rollno, setrollno] = useState(1001);
  const [studentName, setstudentName] = useState();
  const [statsData, setstatsData] = useState([]);

  var data4, data5, data6;

  var totalMarksList = [];

  useEffect(() => {
    console.log("allSems: ", allSems);
    return individualStudents;
  }, []);

  const classes = useStyles();

  var data1;
  var data3;

  var individualStudents = [];

  data3 = {
    datasets: [
      {
        label: "Subject 1 Marks",
        // data: GlobalTableData.map((marks) => (
        //   return {x: marks.rollno, y: marks.subject1}
        // ),
        data: GlobalTableData?.map((marks) => ({
          x: marks.rollno,
          y: marks.subject1,
        })),
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };
  data4 = {
    datasets: [
      {
        label: "Subject 2 Marks",
        // data: GlobalTableData.map((marks) => (
        //   return {x: marks.rollno, y: marks.subject1}
        // ),
        data: GlobalTableData?.map((marks) => ({
          x: marks.rollno,
          y: marks.subject2,
        })),
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };
  data5 = {
    datasets: [
      {
        label: "Subject 3 Marks",
        // data: GlobalTableData.map((marks) => (
        //   return {x: marks.rollno, y: marks.subject1}
        // ),
        data: GlobalTableData?.map((marks) => ({
          x: marks.rollno,
          y: marks.subject3,
        })),
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };
  data6 = {
    datasets: [
      {
        label: "Subject 4 Marks",
        // data: GlobalTableData.map((marks) => (
        //   return {x: marks.rollno, y: marks.subject1}
        // ),
        data: GlobalTableData?.map((marks) => ({
          x: marks.rollno,
          y: marks.subject4,
        })),
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  console.log("GlobalTableData", GlobalTableData);

  const handleRollNoChange = (e) => {
    setrollno(e.target.value);
    // setallSems([sem1, sem2, sem3, sem4]);
  };
  var totalValue;

  const handleClick = () => {
    // setallSems([sem1, sem2, sem3, sem4]);
    console.log("clicked", menuValueSemester, menuValueClass);
    Axios.get("http://localhost:5000/stats").then((response) =>
      setstatsData(response.data.rows)
    );
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

  const statsDataArray = statsData.map((stat) => {
    return stat.gender;
  });
  console.log("statsDataArray: ", statsDataArray);

  function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => v === value && count++);
    return count;
  }

  var uniquestatsDataArray = [...new Set(statsDataArray)];

  console.log("uniquestatsDataArray", uniquestatsDataArray);

  var uniqueStatsCount = [];
  uniquestatsDataArray.forEach((uniqueStatsData) => {
    uniqueStatsCount.push(getOccurrence(statsDataArray, uniqueStatsData));

    console.log(
      "getOccurrencex: ",
      getOccurrence(statsDataArray, uniqueStatsData)
    );
    // console.log("getOccurrencex: ", getOccurrence(uniquestatsDataArray, statsData))
  });

  var data2;

  var datalength = false;

  data2 = {
    labels: uniquestatsDataArray,
    datasets: [
      {
        label: "Gender Ratio",
        data: uniqueStatsCount,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

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

      <Button onClick={handleClick}>Visualize</Button>

      <Bar data={data2} height={5} width={10} className={classes.scatter} />

      <div className={classes.scatter}>
        <Scatter
          data={data3}
          width={3}
          height={3}
          options={{ maintainAspectRatio: true }}
        />
        <Scatter
          data={data4}
          width={3}
          height={3}
          options={{ maintainAspectRatio: true }}
        />
        <Scatter
          data={data5}
          width={3}
          height={3}
          options={{ maintainAspectRatio: true }}
        />
        <Scatter
          data={data6}
          width={3}
          height={3}
          options={{ maintainAspectRatio: true }}
        />
      </div>
    </div>
  );
}
