const express = require('express')
const sqlite3 = require('sqlite3').verbose();

const app = express()
const PORT = 3000

app.use(express.static('public'));
app.use("/styles", express.static("styles"));
app.use(express.json());
app.set('view engine', 'ejs');

let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

app.get("/", async (req, res) => {
    try {
        const response = await fetch("http://localhost:3000/api/todos");
        const data = await response.json();
        res.render("index", { todos: data.data });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}).get("/form", (req, res) => {
    res.render("form");
})
    .get("/api/todos", async (req, res) => {
        try {
            const query = "SELECT * FROM todos";
            const rows = await new Promise((resolve, reject) => {
                db.all(query, [], (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                })
            })
            res.json({
                success: true,
                data: rows
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }).post("/api/todos", async (req, res) => {
        try {
            const query = "INSERT INTO todos (title, description, deadline, is_completed) VALUES (?, ?, ?, ?)";
            const rows = await new Promise((resolve, reject) => {
                db.run(query, [req.body.title, req.body.description, req.body.deadline, 0], (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                })
            })
            res.json({
                success: true,
                data: rows
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }).put("/api/update/:id", async (req, res) => {
        try {
            const query = "UPDATE todos SET is_completed = ? WHERE id = ?";
            const rows = await new Promise((resolve, reject) => {
                db.run(query, [req.body.completed, req.params.id], (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                })
            })
            res.json({
                success: true,
                data: rows
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    })

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})
