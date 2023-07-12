const express = require('express')
const {Sequelize } = require('sequelize')
const app = express()

require('dotenv').config()
app.use(express.json())
app.use (express.urlencoded({ extend: false }))

app.get('/', (req, res) => {
    res.status(200).json({
        message:'Welcome to the Paldea PokeDex'
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`)
})

const sequelize = new Sequelize(process.env.PG_URI);

try {
    sequelize.authenticate();
    console.log(`Connected to database at ${process.env.PG_URI}`);
} catch(e) {
    console.log('unable to connect to database', e);
}