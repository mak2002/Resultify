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
    const [menuValueClass, setmenuValue] = useState('');
    const [classname, setclassname] = useState();

    const [menuValueSemester, setmenuValueSemester] = useState()
    const [semester, setsemester] = useState();

    const handleChangeClass = (e) => {
        setmenuValue(e.target.value)
        setclassname(e.target.value)
    }

    const handleChangeSemester = (e) => {
        setmenuValueSemester(e.target.value)
        setsemester(e.target.value)
    }

    return (
        <div className={classes.root}>
            <Typography variant="h3" color="secondary">Show Results</Typography>

            <Select value={menuValueClass} className={classes.select} onChange={handleChangeClass} disableUnderline>
                <MenuItem value={'class1'}>Class 1</MenuItem>
                <MenuItem value={'class2'}>Class 2</MenuItem>
                <MenuItem value={'class3'}>Class 3</MenuItem>
                <MenuItem value={'class4'}>Class 4</MenuItem>
            </Select>

            <Select value={menuValueSemester} className={classes.select} onChange={handleChangeSemester} disableUnderline>
                <MenuItem value={'class1'}>Sem 1</MenuItem>
                <MenuItem value={'class2'}>Sem 2</MenuItem>
                <MenuItem value={'class3'}>Sem 3</MenuItem>
                <MenuItem value={'class4'}>Sem 4</MenuItem>
            </Select>

            clear
            
        </div>
    )
}