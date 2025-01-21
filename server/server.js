const express = require("express");
require("dotenv").config();
const config = require("./config/constants");
const connectDB = require("./u");

const app = express();

app.use(express.json());
connectDB();

app.get("/about", (req, res) => {
  res.send("This is contact me app");
});

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});
