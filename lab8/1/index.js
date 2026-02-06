const express = require("express");
const mysql = require("mysql2");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let conn = null;

const initDB = () => {
  conn = mysql.createConnection({
    host: "webdev.it.kmitl.ac.th",
    user: "s67070174",
    password: "HEZ51XCO86P",
    database: "s67070174",
  });

  conn.connect((error) => {
    if (error) {
      console.error("Database connection failed:", error);
      throw error;
    }
    console.log("Database connected successfully!!");
  });
};

app
  .get("/", (req, res) => {
    try {
      const sql = "SELECT * FROM users";
      conn.query(sql, (error, results) => {
        if (error) {
          console.error("Query error:", error);
          return res.status(500).json({
            status: "ERROR",
            message: "Database query failed",
          });
        }
        res.render("home", { data: results });
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({
        status: "ERROR",
        message: "Unknown error",
      });
    }
  })
  .get("/form", (req, res) => {
    res.render("form");
  })
  .post("/users", (req, res) => {
    try {
      const {
        username,
        email,
        password,
        firstname,
        lastname,
        age,
        address,
        phone,
      } = req.body;

      sql =
        "INSERT INTO users (username, email, password, firstname, lastname, age, address, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      conn.query(
        sql,
        [username, email, password, firstname, lastname, age, address, phone],
        (error, results) => {
          if (error) {
            console.error("Insert error:", error);
            return res.status(500).json({
              status: "ERROR",
              message: "Failed to create user",
            });
          }
          res.redirect("/");
        },
      );
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({
        status: "ERROR",
        message: "Unknown error",
      });
    }
  });

app.listen(3000, () => {
  initDB();
  console.log("Server is running: http://localhost:3000");
});
