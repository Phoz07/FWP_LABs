const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
const PORT = 3000

app.use(cookieParser())

app.get('/', function (req, res) {
    res.send(`Welcome! Your session ID is ${req.sessionID} <br>
        <ul>
            <li><a href="/set-cookie">Set Cookie</a></li>
            <li><a href="/get-cookie">Get Cookie</a></li>
            <li><a href="/clear-cookie">Clear Cookie</a></li>
        </ul>
        `);
}).get('/set-cookie', (req, res) => {
    try {
        res.cookie('username', 'webdev-admin', {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            secure: false
        });

        res.send('Cookies have been set!');
    } catch (err) {
        console.error('Error setting cookie:', err);
        res.status(500).send('Internal Server Error');
    }
}).get('/get-cookie', (req, res) => {
    try {
        res.send('Hello ' + req.cookies.username);
    } catch (err) {
        console.error('Error reading cookies:', err);
        res.status(500).send('Internal Server Error');
    }
}).get('/clear-cookie', (req, res) => {

    res.clearCookie('username', {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict'
    });
    res.send('Cookie has been cleared.');
})


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})