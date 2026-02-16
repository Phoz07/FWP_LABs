const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use("/styles", express.static("styles"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let db;
const initDB = () => {
  db = new sqlite3.Database("./orders.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the SQLite database.");
    db.run(
      "CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, customer TEXT, product TEXT, address TEXT, state TEXT, phone TEXT)",
    );
    console.log("Table created successfully");
  });
};

app
  .get("/", (req, res) => {
    const sql = "SELECT * FROM orders";
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      res.render("index", { orders: rows });
    });
  })
  .post("/api/order", (req, res) => {
    const { customer, product, phone } = req.body;
    const sql =
      "INSERT INTO orders (customer, product, state, phone) VALUES (?, ?, ?, ?)";
    db.run(sql, [customer, product, "รอดำเนินการ", phone], (err) => {
      if (err) {
        console.error(err.message);
      }
      res.redirect("/");
    });
  })
  // ที่จริงควรจะใช้ Method PUT ในการ Update นะครับ TT
  .get("/api/order/:id", (req, res) => {
    const { id } = req.params;
    const { state } = req.query;
    const sql = "UPDATE orders SET state = ? WHERE id = ?";
    db.run(sql, [state, id], (err) => {
      if (err) {
        console.error(err.message);
      }
      res.redirect("/");
    });
  });

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
  initDB();
});
