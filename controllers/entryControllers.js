const asyncHandler = require('express-async-handler');
const Entry = require ('../models/entryModel');

const getEntries = asyncHandler ( async (req, res) => {
  const entries = await Entry.find()
  res.json(entries);
});

const makeEntry = asyncHandler ( async (req, res) => {
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


const getEntryById = asyncHandler ( async (req, res) => {

  const entry = await Entry.findById(req.params.id);

  if (entry) {
    res.json(entry);
  } else {
    res.status(404);
    throw new Error({message: "Journal entry not found."})
  }

  res.json(entry);

});


const changeEntry = asyncHandler ( async (req, res) => {

  const { heading, content, bible_book } = req.body;

  const entry = await Entry.findById(req.params.id);

  if ( entry.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Unable to perform the desired action.")
  }

  if ( entry ) {
    entry.heading = heading;
    entry.content = content;
    entry.bible_book = bible_book;

    const updatedEntry = await entry.save();
    res.json(updatedEntry);

  } else {
    res.status(404);
    throw new Error("Desired entry cannot be found.");
  }


});



const removeEntry = asyncHandler ( async (req, res) => {

  const entry = await Entry.findById(req.params.id);

  if ( entry.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Unable to perform the desired action.")
  }

  if ( entry ) {
    await entry.remove();
    res.json({ message: "Journal entry removed."});
  } else {
    res.status(404);
    throw new Error("Desired entry cannot be found.");
  }

});






module.exports = { getEntries, makeEntry, getEntryById, changeEntry, removeEntry };