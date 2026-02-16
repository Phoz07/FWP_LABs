const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
app.use(express.static("public"));
app.use("/styles", express.static("styles"));

let db = null;
const initDB = async () => {
  try {
    db = new sqlite3.Database("./questions.db", (err) => {
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
    res.sendFile(path.join(__dirname, "/public/index.html"));
  })
  .get("/api/questions", (req, res) => {
    try {
      db.all("SELECT * FROM questions", (err, rows) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.json({
            questions: rows.map((row) => ({
              id: row.QID,
              question: row.Stem,
              choices: [row.Alt_A, row.Alt_B, row.Alt_C, row.Alt_D],
              answer: row.Correct,
            })),
          });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

app.listen(3000, () => {
  initDB();
  console.log("Server is running on http://localhost:3000");
});
