const express = require('express');
require('dotenv').config();

// file imports
const db = require('./config/db');
const routes = require("./routes/user");

const app = express();

// middlewares
app.use(express.json());


app.use("/api", routes);



app.get('/', (req, res) => res.send('Hello World!'));
app.listen(process.env.SERVER_PORT, () => console.log(`Blog app listening on port ${process.env.SERVER_PORT}!`))