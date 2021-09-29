import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Axios from 'axios'
import {Container, Paper, Box , Dialog, DialogActions, DialogTitle, DialogContent,} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';


const useStyles = makeStyles({
    root:{
        height:'100vh',
    },
    grid:{
        width: '850px',
        margin:'20px auto',
    },
    grid2:{
    },
    textfield: {
        margin: '35px',
    },
    btn: {
        marginTop: '20px',
        marginLeft: '20%',
        width:'50%',
    },
    form:{
        display: 'flex',
        flexWrap: 'wrap'
    },
    select:{
        minWidth: '250px',
    }
    
})

export default function ShowMarks() {

    const classes = useStyles()

    const columns = [
        {field: 'id', headerName: 'ID', width: 140},
        {field: 'name', headerName: 'NAME', width:150, editable: true},
        {field: 'rollno', headerName: 'ROLL NO', width:180, editable: true},
        {field: 'class', headerName: 'CLASS', width: 200, editable: true},
        {field: 'subject1', headerName: 'Subject1', width: 170, editable: true},
        {field: 'subject2', headerName: 'Subject2', width: 170, editable: true},
        {field: 'subject3', headerName: 'Subject3', width: 170, editable: true},
        {field: 'subject4', headerName: 'Subject4', width: 170, editable: true},
        // {field: 'semester', headerName: 'Semester', width: 200, editable: true},
    ]

    const [tableData, settableData] = useState([]);

    const [classname, setclassname] = useState('');
    const [semester, setsemester] = useState('');
    
    const [menuValueClass, setmenuValueClass] = useState('');
    const [menuValueSemester, setmenuValueSemester] = useState('')

    const [resultsTable, setresultsTable] = useState()

    // class value
    const handleChangeClass = (e) => {
        setmenuValueClass(e.target.value)
        setclassname(e.target.value)
    }

    // semester value
    const handleChangeSemester = (e) => {
        setmenuValueSemester(e.target.value)
        setsemester(e.target.value)
    }

    const handleClick = (e) => {
        // fetch marks from marks
        

        Axios.put("http://localhost:3001/resultsbody", {
            semester : semester,
            classname : classname,
        })

        Axios.get("http://localhost:3001/results")
        .then((response) => response.data).then((response) => {settableData(response) ; 
            console.log(response) ;
            setresultsTable(response) ; })
        
    }

    return (
        <div className={classes.root}>
            <Typography variant="h3" color="secondary">Show Results</Typography>

            <Select value={menuValueClass || ''} className={classes.select} onChange={handleChangeClass} disableUnderline>
                <MenuItem value={'class1'}>Class 1</MenuItem>
                <MenuItem value={'class2'}>Class 2</MenuItem>
                <MenuItem value={'class3'}>Class 3</MenuItem>
                <MenuItem value={'class4'}>Class 4</MenuItem>
            </Select>

            <Select value={menuValueSemester || ''} className={classes.select} onChange={handleChangeSemester} disableUnderline>
                <MenuItem value={'Sem1'}>Sem 1</MenuItem>
                <MenuItem value={'Sem2'}>Sem 2</MenuItem>
                <MenuItem value={'Sem3'}>Sem 3</MenuItem>
                <MenuItem value={'Sem4'}>Sem 4</MenuItem>
            </Select>

            <Button onClick={handleClick}>Get Marks</Button>

            <DataGrid
            rows={tableData}
            columns={columns}
            pageSize={5}
            disableSelectionOnClick
            // onRowDoubleClick={(item) => {setcurrentRow(item.row)}}
            // editRowsModel={editRowsModel}
            // onEditRowsModelChange={handleEditRowsModelChange}
            // onCellEditCommit={handleCellEditCommit}
            // cellDoubleClick={setdialogState(true)}
            />
        </div>
    )
}