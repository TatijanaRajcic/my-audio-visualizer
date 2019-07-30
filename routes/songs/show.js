const express = require('express');
const router  = express.Router();
const Songs = require("../../models/Song");
const Effects = require("../../models/Effect");

router.get("/:id", function(req,res) {
  let songId = req.params.id;
  Songs.findById(songId)
    .populate("effects")
    .then(song=>{
      debugger
      Effects.find({song:song})
        .populate("song")
        .then(effects=> {
          res.render("songs/show", {song, effects})
        })
    })
    .catch(err=>{
      res.send(err)
    })
})

module.exports = router;

