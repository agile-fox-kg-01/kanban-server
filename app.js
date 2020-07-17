require('dotenv').config()

const express = require('express')
const routes = require('./routes/index')
const PORT = process.env.PORT
const errorhandler = require('./middlewares/errorhandler')
const cors = require('cors')

const app = express()

app.use(express.urlencoded({ extended:true }))
app.use(express.json())

app.use(cors())

app.use('/', routes)
app.use(errorhandler)

app.listen(PORT, () => {
    console.log(`running at port:${PORT}`)
})