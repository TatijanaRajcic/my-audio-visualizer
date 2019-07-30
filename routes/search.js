const express = require('express');
const router  = express.Router();
const axios = require('axios');

router.get("/", function(req,res) {
    var token = "BCYefiAia4XtdKxbNf5oy1DnkSpwhcYiZlquJ63o"
    var query = req.query.query
    var fields = "id,name,images,username,previews"
    var filter = "duration:[0 TO 30]"
    axios.get(`https://freesound.org/apiv2/search/text/?query=${query}&token=${token}&fields=${fields}&filter=${filter}`)
    .then(function (response) {
      var data = response.data;
      var results = response.data.results;    
      res.render("search", {query, data, results})
    })
    .catch(function (error) {
      console.log(error);
    });
  })

module.exports = router