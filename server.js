const express = require('Express');
const notes = require('./database/dailyEntries');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.get('/', (req, res) => {
  res.send("API is active");
});

app.get('/journalentries', (req, res) => {
  res.json(notes);
});

app.get('/journalentries/:id', (req, res) => {
  const single_note = notes.find((n) => n._id === req.params.id);
  res.send(single_note);
});


const PORT = process.env.PORT || 5000;


app.listen(3003, console.log(`server running on PORT ${PORT}`));

