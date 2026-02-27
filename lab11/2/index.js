const express = require('express')
const session = require('express-session')
const app = express()
const PORT = 3000

app.set("view engine", "ejs")
app
    .use(session({
        secret: 'sTMKWEF5LmK5xtPf5fJeWCe55xvytVnJ%',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 100 * 60 * 60 * 24 }
    }))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use('/styles', express.static('styles'))


app.get("/", async (req, res) => {
    try {
        const response = await fetch('http://webdev.it.kmitl.ac.th:4000/restaurant')
        const data = await response.json()
        res.render("index", {
            title: 'Menu',
            body: 'menu',
            data: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}).get('/cart', async (req, res) => {
    try {
        const response = await fetch('http://webdev.it.kmitl.ac.th:4000/restaurant')
        const allItems = await response.json()
        const sessionCartIds = req.session.cart || []
        const cartData = allItems.filter(item =>
            sessionCartIds.includes(String(item.product_id))
        )
        res.render("index", {
            title: 'Cart',
            body: 'cart',
            data: cartData
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}).post('/api/cart', (req, res) => {
    if (!req.session.cart) {
        req.session.cart = []
    }
    if (!req.session.cart.includes(req.body.id)) {
        req.session.cart.push(req.body.id)
    }
    res.json({
        message: 'Session variables set successfully!'
    })
}).delete('/api/cart', (req, res) => {
    req.session.cart = []
    res.json({
        message: 'Cart cleared successfully!'
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})