const express = require('express');
const router  = express.Router();
var Songs = require("../models/Song");

router.get("/", (req, res, next) => {
    res.render('home');
  })

router.post("/", (req, res, next) => {
  var query = req.body.searched
  res.redirect(`/search?query=${query}`)
  })

router.get('/apiv2/sounds/:id/download', function (req, res, next) {
    var filePath = "/public/songs/..."; // Or format the path using the `id` rest param
    var fileName = "song.mp3"; // The default name the browser will use
  debugger
    res.download(filePath, fileName)
    //use our sound model and create new sound.
    Songs.create({name: fileName, path: filePath, user: req.session.currentUser._id})
    .then((song)=> {
      res.redirect('/edit/:song_id');
    })
    .catch((error)=> {
      next(error)
    }) 
});

  module.exports = router