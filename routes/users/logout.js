const express = require("express");
const router = express.Router();

/* LOG OUT */

router.get("/", (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.redirect("/login");
  });
});

module.exports = router;




