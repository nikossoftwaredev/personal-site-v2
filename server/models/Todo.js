const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  title: { type: String, required: [true, "Why no title?"] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  completed: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Todo", todoSchema);
