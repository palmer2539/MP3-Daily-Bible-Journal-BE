const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const entryRoutes = require('./routes/entryRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandling');
const dbConnection = require('./db');
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

