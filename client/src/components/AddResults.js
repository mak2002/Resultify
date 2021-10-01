import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "tailwindcss/tailwind.css"

const useStyles = makeStyles({
    root:{
        height:'100vh',
    }
})

export default function AddResults() {
    const classes = useStyles()

    const [filePath, setfilePath] = useState()

    // feature to be implemented
    const handleClick = () => {
        console.log('clicked')
        
    }

    return (
        <div className={classes.root}>
            <Typography variant="h3" color="secondary">Add Result</Typography>

            <TextField label="Enter File Path" onChange={(e) => setfilePath(e.target.value)}/>
            <br /><br /> 
            <Button onClick={handleClick}>Open a File</Button>
        </div>
    )
}
