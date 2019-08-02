const express = require("express");
const router = express.Router();
const User = require("../../models/User");
// BCrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

/* SHOW SIGN UP PAGE */

router.get("/", (req, res, next) => {
  res.render("users/signup");
});

/* SIGN UP PROCESS */

router.post("/", (req, res, next) => {
  const {username, password, bio} = req.body

  if (username === "" || password === "") {
    res.render("users/signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }

  User.findOne({ "username": username })
    .then(user => {
      if (user !== null) {
          res.render("users/signup", {
            errorMessage: "The username already exists!"
          });
          return;
        }
    
        const salt     = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);
    
        User.create({
          username: username,
          bio: bio,
          password: hashPass
        })
        .then(() => {
          res.redirect("/");
        })
        .catch(err => {
          res.send(error);
        })
    })
    .catch(err => {
      res.send(err);
    })

})

module.exports = router;




