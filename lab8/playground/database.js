const mysql = require("mysql2");
const conn = mysql.createConnection({
  host: "webdev.it.kmitl.ac.th",
  user: "s67070174",
  password: "HEZ51XCO86P",
  database: "s67070174",
});

conn.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = conn;
