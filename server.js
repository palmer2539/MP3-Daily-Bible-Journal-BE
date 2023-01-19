const express = require('Express');
const notes = require('./database/dailyEntries');
const dotenv = require('dotenv');
const dbConnection = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandling');

const app = express();
dotenv.config();
dbConnection();
app.use(express.json());

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

app.use('/users', userRoutes);

// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;


app.listen(3003, console.log(`server running on PORT ${PORT}`));

