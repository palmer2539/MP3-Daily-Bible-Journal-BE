const express = require('Express');
const notes = require('./database/dailyEntries');
const dotenv = require('dotenv');
const dbConnection = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const entryRoutes = require('./routes/entryRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandling');

const app = express();
dotenv.config();
dbConnection();
app.use(express.json());

app.get('/', (req, res) => {
  res.send("API is active");
});


app.use('/users', userRoutes);
app.use('/journalentries', entryRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


app.listen(3003, console.log(`server running on PORT ${PORT}`));

