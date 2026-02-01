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
  })
  .get("/aliens", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/aliens.html"));
  })
  .get("/not-found", function (req, res) {
    res.sendFile(path.join(__dirname, "public/404.html"));
  });

app.listen(port, () => {
  console.log(`Listening on http://127.0.0.1:${port}`);
});
