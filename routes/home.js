// const express = require('express');
// const router  = express.Router();
// freesound = require('../public/javascripts/freesound.js/freesound')

// const homeRoute = require('./routes/home');
//   app.use('/', homeRoute);
// router.get("/", (req, res, next) => {
//     res.render('test');
//   })

// router.post("/", (req, res, next) => {
//     //Use info from input field as query for freesound api
//     var query = req.body.searched
//     //freesound.textSearch(query)
//         // var page = 1
//         // var filter = "tag:tenuto duration:[1.0 TO 15.0]"
//         // var sort = "rating_desc"
//         // freesound.textSearch(query, {page:page, filter:filter, sort:sort, fields:fields},
//         //     function(sounds){
//         //         var msg = ""
                
//         //         msg = "<h3>Searching for: " + query + "</h3>"
//         //         msg += "With filter: " + filter +" and sorting: " + sort + "<br>"
//         //         msg += "Num results: " + sounds.count + "<br><ul>"
//         //         for (i =0;i<=10;i++){  
//         //             var snd = sounds.getSound(i);
//         //             msg += "<li>" + snd.name + " by " + snd.username + "</li>"
//         //         }
//         //         msg += "</ul>"
//         //         displayMessage(msg,"resp2")
//         //     },function(){ displayError("Error while searching...")}
//         // );
//   })

// router.get('/apiv2/sounds/:id/download', function (req, res, next) {
//     var filePath = "/public/sounds/..."; // Or format the path using the `id` rest param
//     var fileName = "report.pdf"; // The default name the browser will use

//     res.download(filePath, fileName)
//     //use our sound model and create new sound.
//     .then(()=>{
//         res.redirect('/edit')
//     })   
// });

//   module.exports = router