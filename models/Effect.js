const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const effectSchema = new Schema({
  distorsion: Number,
  playback: Number,
  song: {
    type: ObjectId, 
    ref: "Song" // NAME OF MODEL
  },
  image: String
});

const Effect = mongoose.model("Effect", effectSchema, "effects");
// NAME OF MODEL / SCHEMA / COLLECTION

module.exports = Effect;