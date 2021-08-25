const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host:'localhost',
    password:'',
    database:'studentsAppSystem',
}, (err, result) => {
    if (err) {
        console.log(err);
    }
    else(console.log(result));
})

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


app.listen(3001, () => {
    console.log('Server is running on port 3001')
})