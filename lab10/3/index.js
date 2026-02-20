const express = require('express')

const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use("/styles", express.static("styles"))

app.get("/", async (req, res) => {
    try {
        const response = await fetch("http://webdev.it.kmitl.ac.th:4000/books")
        const data = await response.json()
        res.render('index', { books: data })
    } catch (error) {
        res.status(500).json({
            success: true,
            message: "Internal Server Error"
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
