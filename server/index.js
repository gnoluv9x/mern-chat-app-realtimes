const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

// Routers
app.use("/api/auth", userRoutes);

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch(err => {
    console.log("Connect error", err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
