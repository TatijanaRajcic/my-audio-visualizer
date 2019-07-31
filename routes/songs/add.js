var express = require('express');
var router = express.Router();
var Songs = require("../../models/Song");
const axios = require('axios');
var fs = require('fs');
var Path = require("path");


router.get('/', function(req, res, next) {
  var download = req.query.download;
  var id = req.query.id;
  var name = req.query.name;
  debugger 
  axios({
      method: "GET",
      responseType: 'stream',
      url: download,
    }).then((response)=> {
      const path = Path.resolve(__dirname, '../../', 'public/songs', `${id}`)
      let ws = fs.createWriteStream(path);
      response.data.pipe(ws);

      ws.on("finish", function(error){
        
        Songs.create({name: `${name}`, user: req.session.currentUser._id})
        .then((song)=> {
          song.path = id;
          song.save();
          debugger
          res.redirect(`/edit/${song._id}`);

        }) 
        .catch(function (error) {
          console.log(error);
          next(error)
        });

      })
      ws.on("error", function(error) {
        console.log(error);
        next(error);
      })
    })
    .catch((error)=> {
      console.log(error);
      next(error);
    })

  })


router.post('/', function(req, res, next) {
  Songs.create({name: req.file.originalname, path: req.file.filename, user: req.session.currentUser._id})
  /* Songs.create({name: req.file.originalname, user: req.session.currentUser._id}) */
    .then((song)=> {
      /* song.path = song._id;
      song.save(); */
      res.redirect(`/edit/${song._id}`);
    })
    .catch((error)=> {
      next(error)
    })
});

module.exports = router;

