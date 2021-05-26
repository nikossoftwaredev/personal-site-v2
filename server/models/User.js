const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true }, // String is shorthand for {type: String}
  mail: { type: String, required: true },
  password: {
    bcrypt: { type: String, required: true },
  },
  date: { type: Date, default: Date.now },
});

userSchema.path("username").index({ unique: true });

module.exports = mongoose.model("User", userSchema);
