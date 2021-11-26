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
  "SELECT table_name FROM information_schema.tables WHERE table_schema=" +
  "'public'" +
  "AND table_type=" +
  "'BASE TABLE';";

app.get("/students_list", async (req, res) => {
  try {
    const { description } = req.body;
    // console.log();
    // console.log('studentYear',req.query.studentYear)

    // const newTodo = await pool.query(query_statement, [description]);
    student_list_query = "SELECT * FROM " + req.query.studentYear;
    const newTodo = await pool.query(student_list_query);

    req.body.studentYear && console.log("req paramas : ", req.body.studentYear);
    res.json(newTodo);
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/update_list", async (req, res) => {
  const { id, rollno, first_name, last_name, gender, year, selectValue } =
    req.body;
  console.log(
    "rollno : ",
    id,
    rollno,
    first_name,
    last_name,
    gender,
    year,
    selectValue
  );

  var update_list_query =
    "UPDATE " +
    selectValue +
    // " SET first_name = ($1) WHERE rollno = ($2);";
    " SET first_name = ($1), last_name = ($2), gender = ($3), year = ($4) WHERE rollno = ($5);";

  pool.query(
    update_list_query,
    [
      // rollno,
      first_name,
      last_name,
      gender,
      year,
      rollno,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );

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

app.put("/import_csv", (req, res) => {
  const { filePath, tableName } = req.body;

  import_csv_query =
    "CREATE TABLE " +
    tableName +
    " (id INT,rollno VARCHAR(50),first_name VARCHAR(50),last_name VARCHAR(50),gender VARCHAR(50),class VARCHAR(50));COPY " +
    tableName +
    " (id, rollno, first_name, last_name, gender, class) FROM '" +
    filePath +
    "' CSV HEADER;";

  pool.query(import_csv_query, [], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getmarks", (req, res) => {
  student_marks_query =
    "SELECT * FROM " +
    req.query.menuValueClass +
    "_" +
    req.query.menuValueSemester;

  pool.query(student_marks_query, [], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
