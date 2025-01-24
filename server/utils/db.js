const mongoose = require("mongoose");
const config = require("../config/constants");

const connectDB = () => {
  const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  };

  if (!config.DB.URI) {
    throw new Error("MONGODB_URI is not set in .env file.");
  }

  return mongoose.connect(config.DB.URI, clientOptions);
};

module.exports = connectDB;
