const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    const appConnection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connection successful: ${appConnection.connection.host}`);
  } catch (error) {
    console.error(`Error occured: ${error.message}`);
    process.exit();
  }
};

module.exports = dbConnection;