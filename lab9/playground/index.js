const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require("sqlite3").verbose();

const app = express();

let db = new sqlite3.Database("../../mydb.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQlite database.");
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app
  .get("/", (req, res) => {
    res.render("home");
  })
  .get("/create", function (req, res) {
    let sql = `CREATE TABLE employees (
        EmployeeId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        LastName NVARCHAR(20)  NOT NULL,
        FirstName NVARCHAR(20)  NOT NULL,
        Title NVARCHAR(30),
        Phone NVARCHAR(24),
        Email NVARCHAR(60)
    );`;

    db.run(sql, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Table created successfully.");
    });
  })
  .get("/show", function (req, res) {
    let sql = `SELECT * FROM employees`;

    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      console.log(rows);
      res.render("show", { data: rows });
    });
  })
  .get("/form", function (req, res) {
    res.render("form");
  })
  .post("/form", (req, res) => {
    let sql = `INSERT INTO employees (FirstName, LastName, Title, Phone, Email) VALUES (?, ?, ?, ?, ?)`;
    let values = [
      req.body.FirstName,
      req.body.LastName,
      req.body.Title,
      req.body.Phone,
      req.body.Email,
    ];

    db.run(sql, values, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("New employee added successfully.");
      res.redirect("/show");
    });
  });

app.listen(port, () => {
  console.log("Server started.");
});
