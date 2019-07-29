var express = require('express');
var router = express.Router();
var multer = require("multer")
var Songs = require("../../models/Song");

router.post('/', function(req, res, next) {
  Songs.create({name: req.file.originalname, path: req.file.filename, user: req.session.currentUser._id})
    .then((song)=> {
      res.redirect('/');
    })
    .catch((error)=> {
      next(error)
    })
});

module.exports = router;

