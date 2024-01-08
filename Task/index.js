const express = require("express");
const colors = require("colors");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const connectDB = require("./Config/db");
const userRouter = require("./MVC/Router/userRoutes");
const imageRouter = require("./MVC/Router/imageRouter");
const cloudinary = require("cloudinary");
// Middleware
require("dotenv").config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
connectDB();



app.get("/", (req, res) => {
  res.send("Welcome to the world");
});

//  routers for different paths
app.use("/api/v1/user", userRouter);
app.use("/api/v1/image", imageRouter);

const port = 8080;

// Listening port
app.listen(port, () => {
  console.log(`Listening to the port ${port}`.bgCyan);
});
