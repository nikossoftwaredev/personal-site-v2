const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String, // String is shorthand for {type: String}
  mail: String,
  password: {
    bcrypt: { type: String },
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
