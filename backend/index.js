const express = require('express');
require('dotenv').config();

const db = require('./config/db');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(process.env.SERVER_PORT, () => console.log(`Blog app listening on port ${process.env.SERVER_PORT}!`))