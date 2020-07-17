require('dotenv').config()

const express = require('express');
const cors = require('cors');

const router = require('./routes/index.js');
const { errorHandler } = require('./middlewares/errorHandler.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/', router);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
})