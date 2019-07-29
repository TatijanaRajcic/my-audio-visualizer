const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const songSchema = new Schema({
  name: String,
  path: String,
  user: {
    type: ObjectId, 
    ref: "User" // NAME OF MODEL
  },
  effects: Array
});

const Song = mongoose.model("Song", songSchema, "songs");
// NAME OF MODEL / SCHEMA / COLLECTION

module.exports = Song;