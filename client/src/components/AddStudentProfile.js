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

const useStyles = makeStyles({
    root:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height:'100vh',
        maxHeight:'100vh',
        // backgroundColor: '#ffffff',
    },
    grid:{
        width: '900px',
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
        minWidth: '150px',
    }
    
})

export default function AddStudentProfile() {
    const classes = useStyles();

    const [name, setname] = useState();
    const [rollno, setrollno] = useState();
    const [classname, setclassname] = useState();
    const [prn, setprn] = useState();
    const [studentsList, setstudentsList] = useState([]);
    const [menuValue, setmenuValue] = useState('');

    const addStudent = () => {
        Axios.post("http://localhost:3001/create", {
            name: name,
            rollno: rollno,
            classname: classname,
            prn: prn,
          }).then(() => {console.log('success')})
    }

    const getStudents = () => {
        Axios.get("http://localhost:3001/students").then((response) => {
        {console.log(response.data)}
        setstudentsList(response.data)
        })
    }

    const handleChange = (e) => {
        setmenuValue(e.target.value)
        setclassname(e.target.value)
    }

        return (
        <div className={classes.root}>

         <Grid className={classes.grid}>

            <Grid className={classes.grid2}>
            <h2>Enter Students Details</h2>
            </Grid>

            <form className={classes.form}>
            <TextField onChange={(e) => { setname(e.target.value) } } className={classes.textfield} label='Students Name'/>
            <TextField onChange={(e) => { setrollno(e.target.value) } } className={classes.textfield} label='Students Roll No'/>
            
            {/* <InputLabel>Class</InputLabel> */}
            
            {<label>Class</label>}
            <Select value={menuValue} className={classes.select} onChange={handleChange} disableUnderline>
                <MenuItem value={'class1'}>Class 1</MenuItem>
                <MenuItem value={'class2'}>Class 2</MenuItem>
                <MenuItem value={'class3'}>Class 3</MenuItem>
                <MenuItem value={'class4'}>Class 4</MenuItem>
            </Select>

            {/* <TextField onChange={(e) => { setclassname(e.target.value) } } className={classes.textfield} label='Students Class'/> */}
            <TextField onChange={(e) => { setprn(e.target.value) } } className={classes.textfield} label='Students PRN'/>
            <Button variant="contained" color="primary"  className={classes.btn} onClick={addStudent}>
                Add
            </Button>
            <Button variant="contained" color="primary"  className={classes.btn} onClick={getStudents}>Get Students</Button>
            </form>

         </Grid>

        </div>
    )
}