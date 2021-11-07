const express = require("express");
const app = express();
const pool = require("./db");
const cors = require('cors'); 

app.use(express.json());


app.use(cors());

var todo_name = "todo_4";

var query_statement =
  "INSERT INTO " + todo_name + "(description) VALUES ($1) RETURNING *";

app.get("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    // const newTodo = await pool.query(query_statement, [description]);
    const newTodo = await pool.query('SELECT * FROM students_list')


    res.json(newTodo);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
    console.log("listening on port 5000");
  });
  