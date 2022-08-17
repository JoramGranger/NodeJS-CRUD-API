const express = require('express');
const router = express.Router();
const Quote = require('../models/Quotes');

// get all routes
router.get('/', async (req, res) => {
    //res.send("all quotes");
    const quotes = await Quote.find();

    res.json(quotes);
});

// new quote
router.post('/new', async (req, res) => {
    /* //res.send(req.body);
    //res.send("new quote"); */
    const newQuote = new Quote(req.body);
    const savedQuote = await newQuote.save();
    res.json(savedQuote);
});

// specific quote
router.get('/get/:id', async(req, res) => {
    const q = await Quote.findById({ _id: req.params.id });
    res.json(q);
});

// delete quote
router.delete('/delete/:id', async(req, res) => {
    const result = await Quote.findByIdAndDelete({ _id: req.params.id });
    res.json(result);
});

// update quote
router.patch('/update/:id', async(req, res) => {
    const q = await Quote.updateOne({ _id: req.params.id}, { $set: req.body});
    res.json(q);
});

// random quotes
router.get('/random', async (req, res) => {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const q = await Quote.findOne().skip(random);
    res.json(q);

});

module.exports = router;