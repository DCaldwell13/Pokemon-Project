// DEPENDENCIES
const express = require('express')
const app = express()


// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Paldea Pokedex'
    })
});

app.get("*", (req, res) => {
    res.status(404).json({
        message: "Page not found"
    })
});

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`Server is on port: ${process.env.PORT}`)
})