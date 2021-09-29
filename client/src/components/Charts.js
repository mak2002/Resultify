import React, { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2'
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



export default function Charts() {

    const [studentDetails,setstudentDetails] = useState([10])
    const [sem1,setsem1] = useState();
    const [sem2,setsem2] = useState();
    const [sem3,setsem3] = useState();
    const [sem4,setsem4] = useState();

    var studentDetailsTrue = false

    useEffect(() => {

        Axios.get("http://localhost:3001/results")
        .then((response) => response.data)
        .then((response) => {
            setsem2(response);
        })

        Axios.get("http://localhost:3001/results1")
        .then((response) => response.data)
        .then((response) => {setsem1(response);console.log('total result1: ',response)})

        Axios.get("http://localhost:3001/results3")
        .then((response) => response.data)
        .then((response) => {setsem3(response);console.log('total result3: ',response)})

        Axios.get("http://localhost:3001/results4")
        .then((response) => response.data)
        .then((response) => {setsem4(response);console.log('total result4: ',response)})


    
        Axios.get("http://localhost:3001/getindividualresults")
            .then((response) => (response.data))
            .then((response) => { 
            // console.log(response)
            individualStudents.push(response[0].subject1) 
            individualStudents.push(response[0].subject2) 
            individualStudents.push(response[0].subject3) 
            individualStudents.push(response[0].subject4)
            
            console.log('useEffect individualStudents: ',individualStudents)
            setstudentDetails(individualStudents)
        })
        studentDetailsTrue = true

        Axios.get("http://localhost:3001/results")
        .then((response) => response.data)
        .then((response) => {setsem2(response);console.log('total result: ',response)})


        return individualStudents;  


    },[])

    const classes = useStyles()

    var data1

    const [menuValueClass, setmenuValueClass] = useState('');
    const [menuValueSemester, setmenuValueSemester] = useState('')
    const [semester, setsemester] = useState('');
    const [classname, setclassname] = useState('');

    var individualStudents = []


    const handleChangeClass = (e) => {
        setmenuValueClass(e.target.value)
        setclassname(e.target.value)
    }

    const handleChangeSemester = (e) => {
        setmenuValueSemester(e.target.value)
        setsemester(e.target.value)
    }

    var dataappend = [];

    const handleClick = () => {
        console.log('clicked')
        console.log(dataappend)
    }

    
    const getStudentsData = async () => {
        var data2 = [1,2,3,10]
        var data3;
        Axios.get("http://localhost:3001/getindividualresults")
        .then((response) => (response.data))
        .then((response) => { 
        console.log('console response: ',response[0].subject1)
        individualStudents.push(response[0].subject1) 
        individualStudents.push(response[0].subject2) 
        individualStudents.push(response[0].subject3) 
        individualStudents.push(response[0].subject4)
        
        console.log('individualStudents: ',individualStudents)
        setstudentDetails(individualStudents)
    })
    return individualStudents;  
    }

    var handleClickVariable;

    const getChartData = () => {
        console.log('getChartData 2')
        let students_data = getStudentsData()
        students_data.then(function(result) {
            console.log('result: ',result)
            return result;
        })
        // console.log('students_data: ',students_data)
    }

    const data = {
        labels: ['1', '2', '3', '4'],
        datasets: [
          {
            label: '# of Votes',
            data: studentDetails,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      };

      var datalength = false;

      if(dataappend.length > 0) {
        datalength = true
      }

    return (
        <div>
            <Typography variant="h3" color="secondary">Charts</Typography>


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

            {/* {studentDetails.length > 0 ? <Line data={data} options={{ maintainAspectRatio: true}} height={10} width={20}/> : null} */}
            <Line data={data} options={{ maintainAspectRatio: true}} height={10} width={20}/>
        
        </div>
    )
}