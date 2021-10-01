const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json())



const db = mysql.createConnection({
    user: 'root',
    host:'localhost',
    // password:'',
    database:'studentsAppSystem',
}, (err, result) => {
    if (err) {
        console.log(err);
    }
    else(console.log(result));
})

// add a student to database
app.post('/create',(req,res) => { 
    console.log(req.body)   

    const name = req.body.name
    const rollno = req.body.rollno
    const classname = req.body.classname
    const prn = req.body.prn


    db.query("INSERT INTO studentsApp (name, rollno, class, prn) VALUES (?,?,?,?)",
    [name, rollno, classname, prn],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
    )  
})

// get list of all the students in the database
app.get('/students',(req,res) => {
    db.query("SELECT * FROM studentsApp", (err,result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.send(result)
        }
    })
})


var semester
var classname

// results

app.put('/resultsbody', (req,res) => {
    console.log(req.body)

    semester = req.body.semester
    classname = req.body.classname
})

// get semester 2 result
app.get('/results',(req,res) => {
    db.query("SELECT * FROM Temp2", (err,result) => {
        if(err) {
            console.log(err);
        }
        else{
            res.send(result)
        }
    })
})

// get semester 1 result
app.get('/results1',(req,res) => {
    db.query("SELECT * FROM Temp1", (err,result) => {
        if(err) {
            console.log(err);
        }
        else{
            res.send(result)
        }
    })
})

// get semester 3 result
app.get('/results3',(req,res) => {
    db.query("SELECT * FROM Temp3", (err,result) => {
        if(err) {
            console.log(err);
        }
        else{
            res.send(result)
        }
    })
})

// get semester 4 result
app.get('/results4',(req,res) => {
    db.query("SELECT * FROM Temp4", (err,result) => {
        if(err) {
            console.log(err);
        }
        else{
            res.send(result)
        }
    })
})

var semarray = []

app.get('/getindividualresults', (req,res) => {
    db.query("SELECT * FROM Sem2 LIMIT 10,1", (err,result) => {
        if(err) {
            console.log(err);
        }
        else{
            res.send(result)
        }
    })
})



// feature to be implemented
app.put('/update', (req,res) => {
    const id = req.body.id
    const column = req.body.column
    const cellValue = req.body.cellValue

    console.log(column, cellValue, id)

    db.query("UPDATE studentsApp SET ? = ? WHERE id = ?",[column, cellValue, id], (err, result) => {
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    }
)
})

app.listen(3001, () => {
    console.log('Server is running on port 3001')
})