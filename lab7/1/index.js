const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.static("images"));

app
  .get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/home.html"));
  })
  .get("/about", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/about.html"));
  })
  .get("/dogs", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/dogs.html"));
  })
  .get("/cats", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/cats.html"));
  })
  .get("/birds", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/birds.html"));
  });

app.listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
