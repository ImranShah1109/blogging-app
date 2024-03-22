const express = require('express');
require('dotenv').config();
const session = require('express-session');
const MongoDbSession = require('connect-mongodb-session')(session);

// file imports
const db = require('./config/db');
const routes = require("./routes/user");

const app = express();

// middlewares
app.use(express.json());


// store for MongoDb Session
const store = new MongoDbSession({
    uri : process.env.MONGO_URI,
    collection : "sessions",
});

// Using the session middleware
app.use(
    session({
        secret : process.env.SECRET_KEY,
        resave : false,
        saveUninitialized : false,
        store : store
    })
);


// add all the routes from routes

app.use("/api", routes);



app.get('/', (req, res) => res.send('Hello World!'));
app.listen(process.env.SERVER_PORT, () => console.log(`Blog app listening on port ${process.env.SERVER_PORT}!`))