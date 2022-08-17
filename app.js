const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// database
mongoose.connect('mongodb://localhost/motivation', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => {
    console.log("db con 200");
});

// middleware
app.use(bodyParser.json());

// routes
app.get('/', (req, res) => {
    res.send("Hello")
});


const QuotesRoute = require('./routes/Quotes');
app.use('/quotes', QuotesRoute);

app.listen(3000, console.log("listen on port 3k"));