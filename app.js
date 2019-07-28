const express = require("express");
const app = express()

// setting up CORS
var cors = require('cors')
app.use(cors())

// setting up the Public directory (for images, css and javascript (front-end) files)
app.use(express.static('public'))

// setting up hbs that enables us to use functions in our html and to use partials
app.set('view engine', 'hbs');
var hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials');

// the routes
app.get("/analyser", function(req,res) {
  res.render("analyser")
})

app.get("/decode", function(req,res) {
  res.render("decode")
})

app.get("/bars", function(req,res) {
  res.render("bars")
})

// the server
app.listen(3000)