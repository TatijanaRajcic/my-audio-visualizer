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

  module.exports = router