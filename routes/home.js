const express = require('express');
const router  = express.Router();

router.get("/", (req, res, next) => {
    if (req.session.currentUser){
      res.locals.login = true;
    }
    res.render('home');
  })

router.post("/", (req, res, next) => {
  var query = req.body.searched
  var duration = req.body.duration
  var sort = req.body.sort
  res.redirect(`/search?query=${query}&duration=${duration}&sort=${sort}`)
  })

  module.exports = router