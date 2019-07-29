const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");

/* SHOW THE LOGIN PAGE */

router.get("/", (req, res, next) => {
  res.render("users/login");
});

/* LOGGING IN A USER */

router.post("/", (req, res, next) => {
  const theUsername = req.body.username;
  const thePassword = req.body.password;

  if (theUsername === "" || thePassword === "") {
    res.render("users/login", {
      errorMessage: "Please enter both, username and password to sign up."
    });
    return;
  }

  User.findOne({ "username": theUsername })
  .then(user => {
    if (!user) {
      res.render("users/login", {
        errorMessage: "Invalid credentials."
      });
      return;
    }
    if (bcrypt.compareSync(thePassword, user.password)) {
      // compareSync is a bcrypt function thats returns true if the "un-crypted" version 
      // of an existing password is the same as the one the user typed in the form
      // log the user in
      req.session.currentUser = user;
      // with this line, we tell to req.session to create a property called "currentUser" that is equal to the user given by our query
      res.redirect("/");
    } else {
      res.render("users/login", {
        errorMessage: "Invalid credentials"
      });
    }
  })
  .catch(err => {
    res.send(err);
  })
});

module.exports = router;




