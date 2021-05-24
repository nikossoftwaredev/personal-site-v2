//connect to mongo
const mongoose = require("mongoose");
const privateConfig = require("config/private.json");

const connectToMongo = () => {
  mongoose.connect(
    privateConfig.dbUri || "mongodb://localhost:27017/nikos-dim",
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
