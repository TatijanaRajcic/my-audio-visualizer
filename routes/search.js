const express = require('express');
const router  = express.Router();
const axios = require('axios');

router.get("/", function(req,res) {
    var token = "BCYefiAia4XtdKxbNf5oy1DnkSpwhcYiZlquJ63o"
    var fields = "id,name,images,username,previews"
    var query = req.query.query
    var duration = req.query.duration
    var sort = req.query.sort
    if(duration == ""){
      duration = 60
    }
    var filter = `duration:[0 TO ${duration}]`
    axios.get(`https://freesound.org/apiv2/search/text/?query=${query}&token=${token}&fields=${fields}&filter=${filter}&sort=${sort}`)
    .then(function (response) {
      var data = response.data;
      res.render("search", {query, data, duration})
    })
    .catch(function (error) {
      console.log(error);
    });
  })

module.exports = router