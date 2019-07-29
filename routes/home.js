const express = require('express');
const router  = express.Router();
const freesound = require('../public/javascript/freesound');

router.get("/", (req, res, next) => {
    res.render('home');
  })

router.post("/", (req, res, next) => {
  freesound.setToken("BCYefiAia4XtdKxbNf5oy1DnkSpwhcYiZlquJ63o");
    //Use info from input field as query for freesound api
    var query = req.body.searched
    var page = 1
    var filter = "duration:[0 TO 60]"
    var sort = "rating_desc"
    var fields = 'id,name,url';
    freesound.textSearch(query, {page:page, filter:filter, sort:sort, fields:fields},
        function(sounds){
            var msg = "<div class='freesoundPartial'>"
            
            msg += "Num results: " + sounds.count + "<br><ul>"
            for (i =0;i<=14;i++){  
                var snd = sounds.getSound(i);
                msg += "<li>" + snd.name + " by " + snd.username + " with id: " + snd.id + "</li>"
                // msg += "<img src='" + snd.images.waveform_l + "'>";
            }
            msg += "</ul>"
            msg += "</div>"
            res.render("search", {query, msg})
        },function(){ res.send("Error while searching...")}
    );
  })

router.get('/apiv2/sounds/:id/download', function (req, res, next) {
    var filePath = "/public/sounds/..."; // Or format the path using the `id` rest param
    var fileName = "report.pdf"; // The default name the browser will use

    res.download(filePath, fileName)
    //use our sound model and create new sound.
    .then(()=>{
        res.redirect('/edit')
    })   
});

  module.exports = router