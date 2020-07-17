require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const errorHandler = require('./middlewares/errorHandler.js')
const index = require('./routes/index.js')
const cors = require('cors')


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use('/', index)
app.use(errorHandler)
app.listen(port, () => {
  console.log(`app running on http://localhost:${port}`);
})