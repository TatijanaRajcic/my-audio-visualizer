const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const songSchema = new Schema({
  name: String,
  path: String,
  user: {
    type: ObjectId, 
    ref: "User" // NAME OF MODEL
  },
  effets: Array
});

const Song = mongoose.model("Song", songSchema, "songs");
// NAME OF MODEL / SCHEMA / COLLECTION

module.exports = Song;