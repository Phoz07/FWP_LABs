const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs')
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const db = new sqlite3.Database("./customers.db", (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
})

app.get("/", (req, res) => {
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    db.get(`SELECT * FROM customers WHERE CustomerId = ?`, [randomNumber], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Database error");
        } else if (!row) {
            res.status(404).send("Customer not found");
        } else {
            res.render("index", { data: row });
        }
    })
}).post('/save-cookie', (req, res) => {
    try {
        const { customerID, firstName, lastName, email, phone } = req.body;
        res.cookie('customerData', JSON.stringify({ customerID, firstName, lastName, email, phone }), {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            secure: false
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}).get('/get-cookie', (req, res) => {
    try {
        const customerData = req.cookies.customerData;
        if (customerData) {
            res.json({ success: true, data: JSON.parse(customerData) });
        } else {
            res.json({ success: false, message: 'No cookie data found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}).post('/clear-cookie', (req, res) => {
    try {
        res.clearCookie('customerData');
        res.json({ success: true, message: 'Cookie cleared successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});