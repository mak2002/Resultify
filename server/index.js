const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");
const csv = require("csv-parser");
const fs = require("fs");
const results = [];

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

// import csv data to postgres database  dynamically
app.put("/import_table", async (req, res) => {
  const { filePath, tableName, columnTypesArray, columnNames } = req.body;

  var import_statement = "CREATE TABLE " + `${tableName} (`;
  for (let i = 0; i < columnNames.length; i++) {
    if (columnTypesArray[i] === "char")
      columnTypesArray[i] = `VAR${columnTypesArray[i].toUpperCase()}(50)`;

    //if column is last one then dont put ','
    if (i != columnNames.length - 1) {
      import_statement =
        import_statement +
        `${columnNames[i]} ` +
        `${columnTypesArray[i].toUpperCase()}, `;
    } else
      import_statement =
        import_statement +
        `${columnNames[i]} ` +
        `${columnTypesArray[i].toUpperCase()} `;
  }
  import_statement = import_statement + ");COPY ";
  var import_statement2 = columnNames.toString();
  import_statement2 = " (" + import_statement2 + ") FROM '";

  import_csv_query =
    import_statement +
    tableName +
    import_statement2 +
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

// return the column names of csv file
app.put("/upload_csv", (req, res) => {
  const { filePath, tableName } = req.body;
  var count = 0;
  var columnNames;
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => {
      if (count < 1) {
        columnNames = Object.keys(data);
        console.log("columnNames", columnNames);
        res.json(columnNames);
      }
      count++;
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

app.get("/studentMarks", (req, res) => {
  one_student_marks =
    "SELECT * FROM " +
    req.query.menuValueClass +
    "_" +
    req.query.menuValueSemester +
    " WHERE rollno = '" +
    req.query.rollno +
    "';";

  console.log("one_student_marks", one_student_marks);

  pool.query(one_student_marks, [], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/addStudent", (req, res) => {
  const {
    id,
    firstName,
    lastName,
    rollno,
    year,
    menuValueYear,
    menuValueSemester,
  } = req.body;
  // " SET first_name = ($1), last_name = ($2), gender = ($3), year = ($4) WHERE rollno = ($5);";
  add_student_query =
    "INSERT INTO " +
    menuValueYear +
    "_cs_2021_22 " +
    "( id, first_name, last_name, rollno, year) VALUES (($1), ($2), ($3), ($4), ($5));";

  console.log("add_student_query", add_student_query);

  pool.query(
    add_student_query,
    [id, firstName, lastName, rollno, year],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/generatePdf", (req, res) => {
  // console.log("__dirname", __dirname+'/server/FormForm.pdf');
  fs.readFile("./markformlatest.pdf", "base64", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      // console.log(data);
    }
  });
});

app.get("/stats", (req, res) => {
  var { tableNameStats } = req.body;
  tableNameStats = "year4_cs_2021_22";
  var gender = "gender";
  // stats_query = "SELECT ($1) FROM " + tableNameStats;

  // returns array of objects
  stats_query = "SELECT " + gender +  ` FROM ${tableNameStats}`;
  console.log("stats_query: ", stats_query);
  pool.query(stats_query, [], (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
      // console.log(data);
    }
  });
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
