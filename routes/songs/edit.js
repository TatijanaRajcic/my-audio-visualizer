const express = require('express');
const router  = express.Router();

router.get("/:id", function(req,res) {
  res.render("songs/edit")
})

module.exports = router