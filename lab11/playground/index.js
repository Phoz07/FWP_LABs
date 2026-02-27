const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require('path');
const PORT = 3000;
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key-for-your-store',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 100 * 60 * 60 * 24 }
}));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));

let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

app
    .get('/', (req, res) => {
        res.redirect("/products")
    })
    .get('/products', (req, res) => {
        db.all(`SELECT * FROM phones`, (err, rows) => {
            if (err) {
                console.error(err.message);
            } else {
                res.render('index', { title: 'Products', data: rows, body: 'products' });
            }
        });
    })
    .get('/add-to-cart/:item', (req, res) => {
        const item = req.params.item;
        if (!req.session.cart) {
            req.session.cart = [];
        }
        req.session.cart.push(item);
        console.log(`Item '${item}' added to cart...`);
        res.redirect('/products');
    })
    .get('/cart', (req, res) => {
        const cart = req.session.cart || [];
        console.log(`List in your cart: ${cart.join(', ')}`);

        db.serialize(() => {
            const query = `SELECT * FROM phones WHERE id IN (${cart.join(',')})`;
            db.all(query, (err, rows) => {
                if (err) {
                    console.error(err.message);
                } else {
                    res.render('index', { title: 'Carts', data: rows, body: 'cart' });
                }
            });
        });
    })
    .get('/clear-cart', (req, res) => {
        req.session.cart = [];
        res.redirect('/products');
    });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});