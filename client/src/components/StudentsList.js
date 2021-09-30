import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import {Container, Paper, Box, Button, Dialog, DialogActions, DialogTitle, DialogContent,} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root:{
        // backgroundColor:'#9b9b9b',
        height:'100vh',
    },
    datagrid:{
        height:'100vh',
    }
})

export default function StudentsList() {

    const classes = useStyles()

    const [tableData, settableData] = useState([]);
    const [dialogState, setdialogState] = useState();
    const [editRowsModel, seteditRowsModel] = useState({});
    const [currentRow, setcurrentRow] = useState({});

    const handleEditRowsModelChange = React.useCallback((model) => {
        setdialogState(true)
        console.log(model)
        // seteditRowsModel(model);
      }, []);

    const handleCellEditCommit = React.useCallback(
    ({ id, field, value }) => {
        console.log(field , value)
        Axios.put("http://localhost:3001/update", {column: field, cellValue: value, id: id}).then((response) => {
            alert(response)
        })      
    }
    ,
    [tableData],
    );

    const handleChange = (e) => {
        setcurrentRow({...currentRow, [e.target.name]:e.target.value})
    }

    const updateRow = (e) => {
        
    }

    

    const columns = [
        {field: 'id', headerName: 'ID', width: 300},
        {field: 'name', headerName: 'NAME', width:250, editable: true},
        {field: 'rollno', headerName: 'ROLL NO', width:300, editable: true},
        {field: 'class', headerName: 'CLASS', width: 300, editable: true},
        {field: 'prn', headerName: 'PRN', width: 200, editable: true},
    ]


    useEffect(() => {
        Axios.get("http://localhost:3001/students").then((response) => response.data).then((response) => {settableData(response)});
    })

    return (
        <div className={classes.root} style={{height: 1000, width : '100%'}}>

        <Button variant="contained" color="primary">
        EDIT
        </Button>

        <Dialog open={dialogState} >
            <DialogTitle>Update Row Data</DialogTitle>
            
            <DialogContent>
                <TextField  onChange={handleChange} value={currentRow.name} fullWidth label="Name"/>
                <TextField  onChange={handleChange} value={currentRow.rollno} fullWidth label="Roll No"/>
                <TextField  onChange={handleChange} value={currentRow.class} fullWidth label="Class"/>
                <TextField  onChange={handleChange} value={currentRow.prn} fullWidth label="PRN"/>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" color="primary">Update</Button>
                <Button variant="outlined" color="primary" onClick={() => {setdialogState(false); console.log(dialogState);}}>Cancel</Button>
            </DialogActions>

        </Dialog>

        <DataGrid
        className={classes.datagrid}
        rows={tableData}
        columns={columns}
        pageSize={25}
        disableSelectionOnClick
        onRowDoubleClick={(item) => {setcurrentRow(item.row)}}
        editRowsModel={editRowsModel}
        onEditRowsModelChange={handleEditRowsModelChange}
        onCellEditCommit={handleCellEditCommit}
        // cellDoubleClick={setdialogState(true)}
      />
        </div>
    )
}
