const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const effectSchema = new Schema({
  distorsion: Number,
  playback: Number,
  song: {
    type: ObjectId, 
    ref: "Song" // NAME OF MODEL
  },
});

const Effect = mongoose.model("Effect", effectSchema, "effects");
// NAME OF MODEL / SCHEMA / COLLECTION

module.exports = Effect;