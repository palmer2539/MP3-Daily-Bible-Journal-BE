const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const entryRoutes = require('./routes/entryRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandling');
const dbConnection = require('./db');
const app = express();
const cors=require("cors");
const corsOptions ={ origin:'*', methods:'GET,PUT,POST,DELETE,OPTIONS' , credentials:true, optionSuccessStatus:200,}

dotenv.config();
dbConnection();

app.use(express.json());

app.options('*', cors(corsOptions))
app.use(cors(corsOptions)) 

// app.options('*', cors())

// app.options('/journalentries/:id', cors()) // enable pre-flight request for DELETE request
// app.del('/journalentries/:id', cors(), function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Methods", "GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


//  app.use(cors(corsOptions)), 

app.get('/', (req, res) => {
  res.send("API is active");
});
app.use('/users', app.use(cors(corsOptions)), userRoutes);
app.use('/journalentries', app.use(cors(corsOptions)),  entryRoutes);
app.use(notFound);
app.use(errorHandler);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

