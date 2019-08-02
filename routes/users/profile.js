const express = require('express');
const router  = express.Router();
const Users = require("../../models/User");
const Songs = require("../../models/Song");

router.get("/:id", function(req,res) {
  Songs.find({user:req.session.currentUser})
    .populate("user")
    .populate("effects")
    .then(songs=>{
      debugger
      res.render("users/profile", {songs})
    })
    .catch(err=>{
      res.send(err)
    })
})

module.exports = router;