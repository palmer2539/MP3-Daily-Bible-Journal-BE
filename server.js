const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const entryRoutes = require('./routes/entryRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandling');
const dbConnection = require('./db');
const app = express();


app.use(express.json());

dotenv.config();
dbConnection();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 
  "https://dailybiblejournal.onrender.com", 
  "https://dailybiblejournal.onrender.com/signup", 
  "https://dailybiblejournal.onrender.com/users", 
  "https://dailybiblejournal.onrender.com/users/login", 
  "https://dailybiblejournal.onrender.com/users/login/account", 
  "https://dailybiblejournal.onrender.com/journalentries", // update to match the domain you will make the request from
  "https://dailybiblejournal.onrender.com/journalentries/make", // update to match the domain you will make the request from
  "https://dailybiblejournal.onrender.com/journalentries/:id"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', (req, res) => {
  res.send("API is active");
});


app.use('/users', userRoutes);
app.use('/journalentries', entryRoutes);

app.use(notFound);
app.use(errorHandler);


const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

