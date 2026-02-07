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

app.get("/", (req, res) => {
  const sql = "SELECT * FROM albums";
  conn.query(sql, (error, results) => {
    if (error) {
      console.error("Query error:", error);
      return res.status(500).json({
        status: "ERROR",
        message: "Database query failed",
      });
    }
    res.render("home", { albums: results });
  });
});

app.listen(3000, () => {
  initDB();
  console.log("Server is running: http://localhost:3000");
});
