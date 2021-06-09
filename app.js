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

// Симуляция задержки ответа сервера
// app.use(function (req, res, next) {
//   setTimeout(next, 350);
// });

const PORT = process.env.PORT || config.get("port") || 5000;

app.use("/api/auth", authRouter);
app.use("/api", profileRouter);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

mongoose
  .connect(config.get("mongoUri"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Server error ", err.message);
  });
