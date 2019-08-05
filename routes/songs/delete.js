const express = require('express');
const router  = express.Router();
const Songs = require("../../models/Song");
const Effects = require("../../models/Effect");

router.get("/:id", function(req,res) {
  let songId = req.params.id;
  Effects.deleteMany({song:songId})
    .then((result)=>{
      Songs.findByIdAndRemove(songId)
        .then((song)=>{
          res.redirect(`/profile/${req.session.currentUser._id}`)
        })
    })
    .catch((err)=>{
      res.render(err)
    })
})

module.exports = router;