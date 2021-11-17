const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");

app.use(express.json());

app.use(cors());

var todo_name = "todo_4";

var query_statement =
  "INSERT INTO " + todo_name + "(description) VALUES ($1) RETURNING *";

var query_statement1 =
  "SELECT table_name FROM information_schema.tables WHERE table_schema="+"'public'"+"AND table_type="+"'BASE TABLE';";

app.get("/students_list", async (req, res) => {
  try {
    const { description } = req.body;
    // console.log();
    console.log('studentYear',req.query.studentYear)

    // const newTodo = await pool.query(query_statement, [description]);
    student_list_query = "SELECT * FROM "+ req.query.studentYear
    const newTodo = await pool.query(student_list_query);
    
    (req.body.studentYear && console.log("req paramas : ",req.body.studentYear))
    res.json(newTodo);
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/update_list", async (req, res) => {
  const { id, rollno, first_name, last_name, gender, classname } = req.body;
  
  //{name: 'name', rollno: '1234', class: 'class', prn: '1234'}
});

app.get("/list_options", async (req, res) => {
  try {
    // const options = await pool.query('SELECT table_name FROM information_schema.tables WHERE table_schema='+'public'+ ' AND table_type='+'BASE TABLE'+'')
    
    const options = await pool.query(query_statement1);
    // const options = await pool.query("");
    
    res.json(options.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
