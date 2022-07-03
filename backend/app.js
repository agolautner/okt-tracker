const express = require("express");
require('express-async-errors');
const app = express();
const cors = require("cors");

const auth = require("./middlewares/auth");
const { errorHandler } = require("./middlewares/errorHandler");
const hikeRoutes = require("./routes/hike");
const stampRoutes = require("./routes/stamp");
const userRoutes = require("./routes/user");
const morgan = require("morgan");


app.use(
  cors({
    origin: process.env.APP_URL,
  })
);
app.use(express.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use("/api/hike", hikeRoutes);
app.use("/api/stamp", stampRoutes);
app.use("/api/user", userRoutes);

app.get("/api", (req, res) => {
  res.send("Welcome to the API");
});

app.use(errorHandler);

module.exports = app;
