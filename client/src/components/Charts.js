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

    const [studentDetails,setstudentDetails] = useState([10,20,30,40])
    const [sem1,setsem1] = useState();
    const [sem2,setsem2] = useState();
    const [sem3,setsem3] = useState();
    const [sem4,setsem4] = useState();
    const [allSems,setallSems] = useState();

    const [totalMarks, settotalMarks] = useState()

    const [menuValueClass, setmenuValueClass] = useState('');
    const [menuValueSemester, setmenuValueSemester] = useState('')
    const [semester, setsemester] = useState('');
    const [classname, setclassname] = useState('');
    const [rollno,setrollno] = useState(1001);
    const [studentName, setstudentName] = useState()

    var totalMarksList = [];

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

        Axios.get("http://localhost:3001/results")
        .then((response) => response.data)
        .then((response) => {setsem2(response);console.log('total result: ',response)})


        setallSems([sem1,sem2,sem3,sem4])
        console.log('allSems: ',allSems)
        return individualStudents;  


    },[])

    const classes = useStyles()

    var data1

   

    var individualStudents = []


    const handleChangeClass = (e) => {
        setmenuValueClass(e.target.value)
        setclassname(e.target.value)
    }

    const handleChangeSemester = (e) => {
        setmenuValueSemester(e.target.value)
        setsemester(e.target.value)
    }
    
    const handleRollNoChange = (e) => {
        setrollno(e.target.value)
        setallSems([sem1,sem2,sem3,sem4])

    }
    var totalValue;

    const handleClick = () => {
        setallSems([sem1,sem2,sem3,sem4])
        console.log('clicked')
        allSems.map(allsem => {
            totalValue = allsem[rollno-1001].total
            totalMarksList.push(totalValue) 
            setstudentDetails(totalMarksList)
            setstudentName(allsem[rollno-1001].name)
        })
    }

    const data = {
        labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'],
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

    return (
        
        <div>
            
            <Typography variant="h3" color="secondary">Charts</Typography>

            <Select className={classes.select} value={rollno} disableUnderline label="Roll No" onChange={handleRollNoChange}> 
                <MenuItem value={1001}>1001</MenuItem>
                <MenuItem value={1002}>1002</MenuItem>
                <MenuItem value={1003}>1003</MenuItem>
                <MenuItem value={1004}>1004</MenuItem>
                <MenuItem value={1005}>1005</MenuItem>
                <MenuItem value={1006}>1006</MenuItem>
                <MenuItem value={1007}>1007</MenuItem>
                <MenuItem value={1008}>1008</MenuItem>
                <MenuItem value={1009}>1009</MenuItem>
                <MenuItem value={1010}>1010</MenuItem>
            </Select>

            <Button onClick={handleClick}>Get Marks</Button>

            <Typography variant="h4" color="secondary">{studentName}</Typography>


            <Line data={data} options={{ maintainAspectRatio: true}} height={10} width={20}/>
        
        </div>
    )
}