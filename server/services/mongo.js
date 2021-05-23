//connect to mongo
const mongoose = require("mongoose");
const appSettings = require("../app-settings.json");

const connectToMongo = () => {
  mongoose.connect(
    appSettings.DB_URI || "mongodb://localhost:27017/nikos-dim",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  mongoose.connection.on("error", (err) => {
    console.log(`Your error ${err} `);
  });
};

module.exports = connectToMongo;
