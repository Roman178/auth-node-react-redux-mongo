const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");
const mongoose = require("mongoose");
const { authRouter } = require("./routes/auth.routes");
const { profileRouter } = require("./routes/profile.routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// mongoose.connect(config.get("mongoUri"), {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

// Симуляция задержки ответа сервера
// app.use(function (req, res, next) {
//   setTimeout(next, 350);
// });

app.use("/api/auth", authRouter);
app.use("/api", profileRouter);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

module.exports = app;
