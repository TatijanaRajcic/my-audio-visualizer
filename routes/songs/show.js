const express = require('express');
const router  = express.Router();
const Songs = require("../../models/Song");
const Effects = require("../../models/Effect");

router.get("/:id", function(req,res) {
  let songId = req.params.id;
  Songs.findById(songId)
    .populate("effects")
    .populate('user')
    .then(song=>{
      var owner = song.user
      debugger
      if (owner.id === req.session.currentUser._id) {
        res.locals.own = true;
      }
      Effects.find({song:song})
        .populate("song")
        .then(effects=> {
          res.render("songs/show", {song, effects})
          debugger
        })
    })
    .catch(err=>{
      res.send(err)
    })
})

module.exports = router;

