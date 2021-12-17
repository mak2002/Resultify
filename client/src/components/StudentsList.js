import React, { useState, useEffect } from "react";
import Axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {
  Container,
  Paper,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  root: {
    // backgroundColor:'#9b9b9b',
    height: "100vh",
  },
  datagrid: {
    height: "100vh",
  },
  select: {
    minWidth: "150px",
  },
});

export default function StudentsList() {
  const classes = useStyles();

  const [tableData, settableData] = useState([]);
  const [dialogState, setdialogState] = useState();
  const [editRowsModel, seteditRowsModel] = useState({});
  const [currentRow, setcurrentRow] = useState({});

  const [selectValue, setselectValue] = useState();
  const [selectOptions, setselectOptions] = useState();

  var itemId;

  const handleEditRowsModelChange = React.useCallback((model) => {
    setdialogState(true);
    console.log("model : ", Object.keys(model)[0]);
    // setitemId(Object.keys(model)[0]);
    itemId = Object.keys(model)[0];
    // setitemId(Object.keys(model)[0]);
    console.log("model1 : ", itemId);
    // seteditRowsModel(model);
  }, []);

  const handleCellEditCommit = React.useCallback(
    ({ id, field, value }) => {
      console.log("field, value : ", field, value);
      Axios.put("http://localhost:5000/update_list", {
        id: id,
        column: field,
        cellValue: value,
      }).then((response) => {
        alert(response);
      });
    },
    [tableData]
  );

  const handleCellChange = (e) => {
    setcurrentRow({ ...currentRow, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    console.log("current row : ", currentRow);
    console.log("itemID", itemId);

    Axios.put("http://localhost:5000/update_list", {
      id: itemId,
      rollno: currentRow.rollno,
      first_name: currentRow.firstname,
      last_name: currentRow.lastname,
      gender: currentRow.gender,
      year: currentRow.year,
      selectValue: selectValue,
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "rollno", headerName: "ROLL NO", width: 300, editable: true },
    {
      field: "first_name",
      headerName: "First Name",
      width: 200,
      editable: true,
    },
    { field: "last_name", headerName: "Last Name", width: 200, editable: true },
    { field: "gender", headerName: "GENDER", width: 200, editable: true },
    { field: "year", headerName: "YEAR", width: 300, editable: true },
  ];

  const getStudentsList = () => {
    Axios.get("http://localhost:5000/students_list", {
      params: {
        studentYear: selectValue,
      },
    })
      .then((response) => response.data)
      .then((response) => {
        settableData(response.rows);
      });
  };

  const handleOptionsClick = () => {
    Axios.get("http://localhost:5000/list_options")
      .then((response) => response.data)
      .then((response) => {
        setselectOptions(response);
        console.log(selectOptions);
      });
  };

  const handleSelectChange = (e) => {
    setselectValue(e.target.value);
    console.log(selectValue);
  };

  return (
    <div className={classes.root} style={{ height: 1000, width: "100%" }}>
      <Button variant="contained" color="primary">
        EDIT
      </Button>

      <Select
        value={selectValue}
        className={classes.select}
        disableUnderline
        onClick={handleOptionsClick}
        onChange={handleSelectChange}
        defaultValue=""
      >
        {selectOptions &&
          selectOptions.map((item) => {
            return (
              <MenuItem value={item.table_name}>
                {item.table_name.toUpperCase()}
              </MenuItem>
            );
          })}
      </Select>

      <Button variant="contained" color="primary" onClick={getStudentsList}>
        GET TABLE DATA
      </Button>

      <Dialog open={dialogState}>
        <DialogTitle>Update Row Data</DialogTitle>

        <DialogContent>
          <TextField
            onChange={handleCellChange}
            name="firstname"
            fullWidth
            label="First Name"
          />

          <TextField
            onChange={handleCellChange}
            name="lastname"
            fullWidth
            label="Last Name"
          />

          <TextField
            onChange={handleCellChange}
            name="gender"
            fullWidth
            label="Gender"
          />

          <TextField
            onChange={handleCellChange}
            fullWidth
            name="rollno"
            label="Roll No"
          />
          <TextField
            onChange={handleCellChange}
            fullWidth
            name="year"
            label="Year"
          />
        </DialogContent>

        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setdialogState(false);
              console.log("dialogState : ", dialogState);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <DataGrid
        className={classes.datagrid}
        rows={tableData}
        columns={columns}
        pageSize={25}
        disableSelectionOnClick
        onEditRowsModelChange={handleEditRowsModelChange}
        onCellEditCommit={handleCellEditCommit}
      />
    </div>
  );
}
