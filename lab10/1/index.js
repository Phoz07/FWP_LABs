const express = require('express')

const app = express()
const PORT = 3000

app.use("/styles", express.static("styles"))
app.set("view engine", "ejs")

app.get('/', async (req, res) => {
    try {
        const response = await fetch("http://webdev.it.kmitl.ac.th:4000/restaurant")
        const data = await response.json()
        res.render("foods", { data })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}).get('/food/:id', async (req, res) => {
    try {
        const response = await fetch(`http://webdev.it.kmitl.ac.th:4000/detail/${req.params.id}`)
        const data = await response.json()
        res.render("food", { data })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
})


app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})
