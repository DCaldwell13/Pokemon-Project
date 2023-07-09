const express = require('express');
const app = express();

require('dotenv').config()
app.use(express.json())
app.use(exress.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Paldea PokeDex'
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server's running on port ${process.env.PORT}`)
})