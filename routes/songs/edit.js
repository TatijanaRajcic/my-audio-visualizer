const express = require('express');
const router  = express.Router();
const Songs = require("../../models/Song");
const Effects = require("../../models/Effect");

router.get("/:id", function(req,res) {
  let songId = req.params.id;
  Songs.findById(songId)
    .then(song => {
      let songPath = song.path;
      res.render("songs/edit", {songId, songPath})
    })
})

router.post("/:id", function(req, res, next) {
  let playback = req.body.playback;
  let songId = req.params.id;
  let screenshot = req.body.src;
  Songs.findById(songId)
    .then((song)=>{
      Effects.create({playback: playback, song: song._id, image: screenshot})
        .then((effect)=>{
          Songs.findByIdAndUpdate(songId, {$push: { effects: effect._id }}, {new: true})
            .then(result=>{
            /* res.redirect("/") */
            })
        })        
      })
    .catch((error)=> {
      next(error)
    })
});

module.exports = router;

