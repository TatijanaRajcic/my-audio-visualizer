const express = require("express");
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

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
app.use('/', require('./routes/home'))
app.use('/edit', require('./routes/edit'));
// app.use('/search', require('./routes/search'));

// the server
app.listen(3000)

//hello