const express = require('express');
const router  = express.Router();
const Songs = require("../../models/Song");
const Effects = require("../../models/Effect");

router.get("/:id", function(req,res) {
  let songId = req.params.id;
  Songs.findById(songId)
    .populate("effects")
    .then(song=>{
      let effects = song.effects;
      res.render("songs/show", {effects})
    })
    .catch(err=>{
      res.send(err)
    })
})

module.exports = router;


