const express = require("express");
const path = require("path");
const app = express();

const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const conn = require("./database");

app
  .get("/", (req, res) => {
    res.send(`
      <html>
        <head>
          <title>Home</title>
        </head>
        <body>
          <button onclick="createTable()">Create Table</button>
          <button onclick="insertData()">Insert 5 Instructors</button>
          <button onclick="window.location.href='/showdata'">Show Data</button>
          <button onclick="window.location.href='/form'">Insert Instructor</button>
          <script>
            function createTable() {
              fetch('/create', { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                  if (data.status === 'OK') {
                    alert('Table created successfully!');
                  } else {
                    alert('An error occurred while creating the table.');
                  }
                });
            }
            function insertData() {
              fetch('/insert', { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                  if (data.status === 'OK') {
                    alert('Data inserted successfully!');
                  } else {
                    alert('An error occurred while inserting data.');
                  }
                });
            }
          </script>
        </body>
      </html>
    `);
    res.status(200).json({
      status: "OK",
      message: "Hello World!",
    });
  })
  .get("/create", (req, res) => {
    try {
      const sql =
        "CREATE TABLE IF NOT EXISTS instructor (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), dept_name VARCHAR(255), salary INT(10))";
      conn.query(sql, (error, results) => {
        if (error) throw error;
      });
      res.status(201).json({
        status: "OK",
        message: "Table created successfully!",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "ERROR",
        message: "An error occurred while creating the table.",
      });
    }
  })
  .get("/insert", (req, res) => {
    try {
      const mockUpData = [
        {
          id: "10101",
          name: "Srinivasan",
          dept_name: "Comp. Sci.",
          salary: 65000,
        },
        {
          id: "10201",
          name: "Brandt",
          dept_name: "Finance",
          salary: 92000,
        },
        {
          id: "10301",
          name: "Lopez",
          dept_name: "History",
          salary: 42000,
        },
        {
          id: "10302",
          name: "Lopez",
          dept_name: "History",
          salary: 42000,
        },
        {
          id: "10304",
          name: "Lopez",
          dept_name: "History",
          salary: 42000,
        },
      ];
      const sql =
        "INSERT INTO instructor (id, name, dept_name, salary) VALUES (?, ?, ?, ?)";
      mockUpData.forEach((data) => {
        const values = [data.id, data.name, data.dept_name, data.salary];
        conn.query(sql, values, (error, results) => {
          if (error) throw error;
        });
      });
      res.status(201).json({
        status: "OK",
        message: "Instructors created successfully!",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "ERROR",
        message: "An error occurred while creating the instructor.",
      });
    }
  })
  .get("/showdata", (req, res) => {
    try {
      const sql = "SELECT * FROM instructor";
      conn.query(sql, (error, results) => {
        if (error) throw error;
        // console.log(results);
        res.render("show", { data: results });
        // res.status(200).json({
        //   status: "OK",
        // });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "ERROR",
        message: "An error occurred while fetching instructors.",
      });
    }
  })
  .get("/form", (req, res) => {
    res.sendFile(__dirname + "/public/form.html");
  })
  .post("/form-post", (req, res) => {
    try {
      const { id, name, dept_name, salary } = req.body;
      const sql =
        "INSERT INTO instructor (id, name, dept_name, salary) VALUES (?, ?, ?, ?)";
      const values = [id, name, dept_name, salary];
      conn.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(201).json({
          status: "OK",
          message: "Instructor created successfully!",
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "ERROR",
        message: "An error occurred while creating the instructor.",
      });
    }
  });

app.listen(port, () => {
  console.log(`Server is running: http://localhost:${port}`);
});
