const express = require('express');
const router  = express.Router();
const Users = require("../../models/User");
const Songs = require("../../models/Song");

router.get("/:id", function(req,res) {
  var userId = req.params.id
  res.locals.own = false;
  Users.findById(userId)
  .then((user)=>{
    Songs.find({user: user})
    .populate("user")
    .populate("effects")
    .then(songs=>{
      if (req.session.currentUser._id == userId) {
        res.locals.own = true;
      }
      res.render("users/profile", {songs, user})
    })
    .catch(err=>{
      res.send(err)
    })
  })
  
})

module.exports = router;