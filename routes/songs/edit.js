const express = require('express');
const router  = express.Router();
const Songs = require("../../models/Song");
const Effects = require("../../models/Effect");

router.get("/:id", function(req,res) {
  let songId = req.params.id;
  debugger
  Songs.findById(songId)
    .then(song => {
      let songPath = song.path;
      res.render("songs/edit", {songId, songPath})
    })
})

router.post("/:id", function(req, res, next) {
  let songId = req.params.id;
  Songs.findById(songId)
    .then((song)=>{
      Effects.create({playback: 3, song: song._id})
        .then((effect)=>{
          debugger
          Songs.findByIdAndUpdate(songId, {$push: { effects: effect }}, {new: true})
            .then(result=>{
            res.redirect("/")
            })
        })        
      })
    .catch((error)=> {
      next(error)
    })
});

module.exports = router;

