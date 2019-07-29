const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema, "users");
// NAME OF MODEL / SCHEMA / COLLECTION

module.exports = User;