const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('./smartphones.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});


// static resourse & templating engine
app.use(express.static('public'));
app.use("/styles", express.static("styles"));
// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app
    .get("/show", (req, res) => {
        const endpoint = 'http://localhost:3000/smartphones';
        fetch(endpoint)
            .then(response => response.json())
            .then(wsdata => {
                console.log(wsdata);
                res.render('show', { data: wsdata.data });
            })
            .catch(error => {
                console.log(error);
            });
    }).get("/show-employees", (req, res) => {
        const endpoint = 'http://localhost:3000/employees';
        fetch(endpoint)
            .then(response => response.json())
            .then(wsdata => {
                console.log(wsdata);
                res.render('showEmp', { data: wsdata.data });
            })
            .catch(error => {
                console.log(error);
            });
    })
    .get("/", (req, res) => {
        res.json({
            success: true,
            message: "Welcome to the Smartphone API"
        })
    }).get('/smartphones', (req, res) => {
        const query = 'SELECT * FROM smartphones';
        db.all(query, (err, rows) => {
            if (err) {
                console.log(err.message);
            }
            res.json({
                success: true,
                data: rows
            })
        });
    }).get('/smartphones/:id', (req, res) => {
        // req.params.id
        const query = `SELECT * FROM smartphones WHERE id = ${req.params.id}; `;
        db.all(query, (err, rows) => {
            if (err) {
                console.log(err.message);
            }
            res.json({
                success: true,
                data: rows
            });
        });
    }).get("/employees", (req, res) => {

        //  ทุกรายการ  http://webdev.it.kmitl.ac.th:4000/employees';
        //  รายละเอียด http://webdev.it.kmitl.ac.th:4000/employee/id ';

        const endpoint = 'http://webdev.it.kmitl.ac.th:4000/employees';
        fetch(endpoint)
            .then(response => response.json())
            .then(emp => {
                res.json({
                    success: true,
                    data: emp
                })
            })
            .catch(error => {
                console.log(error);
            });
    });

app.listen(port, () => {
    console.log(`Starting server at port ${port}`);
});