import React from 'react'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    root:{
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        // alignItems: 'center',
        // alignItems: 'center',
    },
    main: {
        height: '100vh',
        width: '40%',
        display: 'flex',
        flexWrap: 'wrap',
        
    },
    textfield: {
        margin: '10px',
    }
})

export default function AddStudentProfile() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <p>
                Add Students Profile
            </p>
            <div >
                <form className={classes.main}>
                    <TextField  margin='none' className={classes.textfield} label="Student Name"/>
                    <TextField  margin='none' className={classes.textfield} label="Student Roll No"/>
                    <TextField  margin='none' className={classes.textfield} label="Student Class"/>
                    <TextField  margin='none' className={classes.textfield} label="Student Class"/>
                    <TextField  margin='none' className={classes.textfield} label="Student Class"/>
                </form>
            </div>
        </div>
    )
}