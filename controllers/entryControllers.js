const asyncHandler = require('express-async-handler');
const notes = require('../database/dailyEntries');
const Entry = require ('../models/entryModel');

const getEntries = asyncHandler ( async (req, res) => {
  const entries = await Entry.find()
  res.json(entries);
});

const makeEntry = asyncHandler( async (req, res) => {
  const { heading, content, bible_book } = req.body;


  if (!heading || !content || !bible_book) {
    res.status(400)
    throw new Error("Please provide all of the required fields!");
  } else {
    const entry = new Entry({user: req.user._id, heading, content, bible_book});

    const madeEntry = await entry.save();

    res.status(201).json(madeEntry);
  }
});


module.exports = { getEntries, makeEntry };