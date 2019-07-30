const express = require("express");
const mongoose = require('mongoose');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const session    = require("express-session");
/* const MongoStore = require("connect-mongo")(session); */
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require("multer");
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

// Connection to the database "soundEditing"
mongoose.connect('mongodb://localhost/soundEditing', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// setting up CORS
app.use(cors())

// configuring express session
app.use(session({
  secret: 'super secret',
  resave: false,
  saveUninitialized: true,
}))

// setting up cookie parser
app.use(cookieParser());

// setting up the Public directory (for images, css and javascript (front-end) files)
app.use(express.static('public'))

// setting up hbs that enables us to use functions in our html and to use partials
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

// Setting up bodyparser
app.use(bodyParser.urlencoded({ extended: false }))

// Setting up a middleware so that I can use the "currentUser" everywhere

app.use(function(req,res,next) {
  /* if the user is logged in */
  /* at login, I called my user currentUser so that's why I need to use req.session.currentUser */
  if (req.session.currentUser){
    /* here, I decide to use the same name on top of res.locals */
    res.locals.currentUser = req.session.currentUser
  } 
  next()
})

// Configuring multer for songs upload
let upload = multer({ dest: "public/songs" });

// the routes

app.use('/', require('./routes/home'));
app.use('/search', require('./routes/search'));

// songs' routes
app.use("/show", require("./routes/songs/show"))
app.use('/add', upload.single("song"), require('./routes/songs/add'));
app.use('/edit', require('./routes/songs/edit'));

// users' routes
app.use('/login', require('./routes/users/login'));
app.use('/signup', require('./routes/users/signup'));
app.use('/logout', require('./routes/users/logout'));
app.use('/profile', require('./routes/users/profile'));
app.use('/index', require('./routes/users/index'));

// Limit the access to routes to logged in users

function accessControl(req, res, next) { 
  if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
    next();  // ==> go to the next element, which is the route we call with "require(...)"
  } else {                      
    res.redirect("/login");         
  }                                 
}

// Establish connection
app.listen(3000, () => console.log("My Sound Editing project is running"));

// Exporting the app
module.exports = app;