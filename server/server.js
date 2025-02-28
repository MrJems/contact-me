require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("./config/constants");
const connectDB = require("./utils/db");

const homeRoutes = require("./routes/homeRoutes");
const authRoutes = require("./routes/authRoutes");

const socketServer = require("./socketServer");
const userRoutes = require("./routes/userRoutes");
const authenticateUser = require("./middleware/auth");
const roles = require("./config/roles");
const authorizeRoles = require("./middleware/authorizeRoles");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://contact-karan.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));

app.use(authenticateUser);
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/users", authorizeRoles(roles.admin), userRoutes);

connectDB()
  .then(() => {
    console.log("MongoDB connected successfully!");
    const server = http.createServer(app);
    socketServer.registerSocketServer(server);
    server.listen(config.PORT, () => {
      console.log(`Server is running on http://localhost:${config.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });
