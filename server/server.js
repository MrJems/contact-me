require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("./config/constants");
const connectDB = require("./utils/db");

const homwRoutes = require("./routes/homeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/", homwRoutes);
app.use("/auth", authRoutes);

connectDB()
  .then(() => {
    console.log("MongoDB connected successfully!");
    const server = http.createServer(app);
    server.listen(config.PORT, () => {
      console.log(`Server is running on http://localhost:${config.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });
