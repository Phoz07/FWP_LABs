const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/styles", express.static("styles"));

let db = null;
const initDB = async () => {
  try {
    db = new sqlite3.Database("./userdata.db", (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Connected to the SQlite database.");
    });
  } catch (error) {
    console.error(error);
  }
};

app
  .get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/home.html"));
  })
  .get("/users/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/user.html"));
  })
  .get("/api/users", (req, res) => {
    try {
      const sql = `SELECT * FROM users`;
      db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        res.json(rows);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  })
  .get("/api/users/:id", (req, res) => {
    try {
      const userId = req.params.id;
      const sql = `SELECT * FROM users WHERE id = ?`;
      db.get(sql, [userId], (err, row) => {
        if (err) {
          throw err;
        }
        res.json(row);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

app.listen(3000, () => {
  initDB();
  console.log("Server is running : http://localhost:3000");
});
