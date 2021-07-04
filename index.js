const config = require("config");
const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || config.get("port");

mongoose
  .connect(
    config.get("mongoUri", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  });
