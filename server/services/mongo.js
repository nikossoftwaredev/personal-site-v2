//connect to mongo
const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose.connect(process.env.DB_URI || "mongodb://localhost:27017/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("error", (err) => {
    console.log(`Your error ${err} `);
  });
};

module.exports = connectToMongo;
