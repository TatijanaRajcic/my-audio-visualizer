const express = require('express');
const router  = express.Router();
const Users = require("../../models/User");

router.get("/", function(req,res) {
  Users.find({})
    .then(users=>{
      res.render("users/index", {users})
    })
    .catch(err=>{
      res.send(err)
    })
})

module.exports = router;