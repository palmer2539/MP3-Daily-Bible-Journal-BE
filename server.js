const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const entryRoutes = require('./routes/entryRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandling');
const dbConnection = require('./db');
const app = express();
const cors=require("cors");

app.use(express.json());

dotenv.config();
dbConnection();

const corsOptions ={
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', app.use(cors(corsOptions)), (req, res) => {
  res.send("API is active");
});


app.use('/users', userRoutes);
app.use('/journalentries', entryRoutes);

app.use(notFound);
app.use(errorHandler);






const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

