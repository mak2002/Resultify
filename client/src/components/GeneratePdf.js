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

import { PDFDocument } from "pdf-lib";

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

export default function GeneratePdf() {
  const [menuValueClass, setmenuValueClass] = useState("year1");
  const [menuValueSemester, setmenuValueSemester] = useState("sem1");

  const [semester, setsemester] = useState("");
  const [classname, setclassname] = useState("");
  const [rollno, setrollno] = useState(1001);
  const [marks, setmarks] = useState();
  var FileSaver = require("file-saver");
  const [clicked, setclicked] = useState(false);


  // const formPdfBytes = await fetch('FormForm.pdf').then((response) => response.arrayBuffer())

  const generatePdf = async () => {
    const pdfDoc = await PDFDocument.load(somePdf);

    const form = pdfDoc.getForm();

    const nameField = form.getTextField("name");
    const rollnofield = form.getTextField("rollno");
    const subject1field = form.getTextField("marks1");
    const subject2field = form.getTextField("marks2");
    const subject3field = form.getTextField("marks3");
    const subject4field = form.getTextField("marks4");
    const total = form.getTextField("totalmarks");

    nameField.setText("Name");
    if (marks !== undefined) {
      rollnofield.setText(marks.rollno);
      subject1field.setText(marks.subject1.toString());
      subject2field.setText(marks.subject2.toString());
      subject3field.setText(marks.subject3.toString());
      subject4field.setText(marks.subject4.toString());
      total.setText(marks.total.toString());

      form.flatten();

      const pdfBytes = await pdfDoc.save("testpdf.js");

      function saveByteArray(reportName, byte) {
        var blob = new Blob([byte], { type: "application/pdf" });
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        var fileName = reportName;
        link.download = fileName;
        link.click();
      }

      // function openPdf(pdfBytes) {
      //   var file = new Blob([pdfBytes], { type: "application/pdf" });
      //   var fileURL = URL.createObjectURL(file);
      //   // file.save("tempDocument");
      //   window.open(fileURL);
      // }
      // openPdf(pdfBytes);
      saveByteArray(`${marks.rollno}-result`, pdfBytes);
    }
  };

  var existingPdfBytes;
  var somePdf;
  const handleClick = async () => {
    // setallSems([sem1, sem2, sem3, sem4]);
    console.log("clicked", rollno, menuValueSemester, menuValueClass);

    somePdf = await Axios.get("http://localhost:5000/generatePdf").then(
      (response) => {
        console.log("response response", response);
        // console.log("response response 1", response.data.arrayBuffer());
        return response.data;
      }
    );



    Axios.get("http://localhost:5000/studentMarks", {
      params: {
        menuValueClass: menuValueClass,
        menuValueSemester: menuValueSemester,
        rollno: rollno,
      },
    })
      .then((response) => response.data.rows[0])
      .then((response) => {
        setmarks(response);
      });

    setclicked(!clicked);

    // .then(() => generatePdf());
  };

  useEffect(() => {
    generatePdf();
  }, [clicked]);


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

  const handleTextChange = (e) => {
    setrollno(e.target.value);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField label="Roll.No." onChange={handleTextChange} value={rollno} />

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

      {/* <embed src="file_name.pdf" width="800px" height="2100px" /> */}
    </div>
  );
}
