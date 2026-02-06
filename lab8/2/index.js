const express = require("express");
const cookieParser = require("cookie-parser");
const mysql = require("mysql2");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
      const userId = req.cookies.userId;
      if (!userId) {
        return res.redirect("/form");
      }
      const sql = "SELECT * FROM users WHERE id = ?";
      conn.query(sql, [userId], (error, results) => {
        if (error) {
          console.error("Query error:", error);
          return res.status(500).json({
            status: "ERROR",
            message: "Database query failed",
          });
        }
        res.render("home", { user: results[0] });
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
  .post("/login", (req, res) => {
    try {
      const { username, password } = req.body;
      const sql = "SELECT * FROM users WHERE username = ? OR email = ?";
      conn.query(sql, [username, username], (error, results) => {
        if (error) {
          console.error("Query error:", error);
          return res.status(500).json({
            status: "ERROR",
            message: "Database query failed",
          });
        }
        if (results.length === 0) {
          return res.status(401).json({
            status: "ERROR",
            message: "Invalid username or email",
          });
        }
        if (results[0].password !== password) {
          return res.status(401).json({
            status: "ERROR",
            message: "Invalid password",
          });
        }
        res.cookie("userId", results[0].id, {
          maxAge: 900000,
          httpOnly: true,
          secure: false,
        });
        res.redirect("/");
      });
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
