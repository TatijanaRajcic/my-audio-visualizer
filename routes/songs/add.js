var express = require('express');
var router = express.Router();
var multer = require("multer")
var Songs = require("../../models/Song");

router.post('/', function(req, res, next) {
  Songs.create({name: req.file.originalname, path: req.file.filename, user: req.session.currentUser._id})
  /* Songs.create({name: req.file.originalname, user: req.session.currentUser._id}) */
    .then((song)=> {
      /* song.path = song._id;
      song.save(); */
      res.redirect(`/edit/${song._id}`);
    })
    .catch((error)=> {
      next(error)
    })
});

module.exports = router;

