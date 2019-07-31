const express = require('express');
const router  = express.Router();
const Songs = require("../../models/Song");
const Effects = require("../../models/Effect");

router.get("/:id/:songId", function(req,res) {
  let effectId = req.params.id;
  let songId = req.params.songId;
  Songs.findById(songId)
    .then((song)=>{
      song.effects.remove(effectId);
      song.save();
    })
    .then((result)=>{
      Effects.findByIdAndRemove(effectId)
      .then(effect => {
        res.redirect(`/show/${songId}`)
      })
    })
})

module.exports = router;