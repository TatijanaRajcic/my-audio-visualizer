const express = require('express');
const router  = express.Router();
const Songs = require("../../models/Song")

router.get("/:id", function(req,res) {
  let songId = req.params.id;
  Songs.findById(songId)
    .then(song => {
      let songPath = song.path;
      res.render("songs/edit", {songPath})
    })
})

module.exports = router