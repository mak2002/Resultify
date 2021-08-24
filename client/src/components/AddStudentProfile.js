import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
    }
    
})

export default function AddStudentProfile() {
    const classes = useStyles();

    const [name, setname] = useState();
    const [rollno, setrollno] = useState();
    const [classname, setclassname] = useState();
    const [prn, setprn] = useState();

    return (
        <div className={classes.root}>

         <Grid className={classes.grid}>

            <Grid className={classes.grid2}>
            <h2>Enter Students Details</h2>
            </Grid>

            <form className={classes.form}>
            <TextField onChange={(e) => { setname(e.target.value) } } className={classes.textfield} label='Students Name'/>
            <TextField onChange={(e) => { setrollno(e.target.value) } } className={classes.textfield} label='Students Roll No'/>
            <TextField onChange={(e) => { setclassname(e.target.value) } } className={classes.textfield} label='Students Class'/>
            <TextField onChange={(e) => { setprn(e.target.value) } } className={classes.textfield} label='Students PRN'/>
            <Button variant="contained" color="primary"  className={classes.btn} onClick={() => console.log(name,rollno,classname,prn)}>
                Add
            </Button>
            </form>

         </Grid>

        </div>
    )
}