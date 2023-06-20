const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/api");
require("dotenv").config();


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDb connected");
  })

  .catch((err) => {
    console.log(err);
  });

app.use("/", todoRoutes);

app.get("/", (req, res) => {
  res.json({ message: "get request", status: 200 });
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
