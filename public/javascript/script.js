window.onload = function(){

    //freesound.setToken("BCYefiAia4XtdKxbNf5oy1DnkSpwhcYiZlquJ63o");
    //var query = freesound.textSearch("dogs")
    //console.log(query)
    //var soundId = sound.id;
    //var fields = 'id,name,url';
    // Example 1
    // Example of geeting the info of a sound, queying for similar sounds (content based) and showing some analysis
    // features. Both similar sounds and analysis features are obtained with additional requests to the api.
    // freesound.getSound(196860,
    //         function(sound){
    //             var msg = "";

    //             msg = "<h3>Getting info of sound: " + sound.name + "</h3>";
    //             msg += "<strong>Url:</strong> " + sound.url + "<br>";
    //             msg += "<strong>Description:</strong> " + sound.description + "<br>";
    //             msg += "<strong>Tags:</strong><ul>";
    //             for (i in sound.tags){
    //                 msg += "<li>" + sound.tags[i] + "</li>";
    //             }
    //             msg += "</ul><br>";
    //             msg += "<img src='" + sound.images.waveform_l + "'>";

    //             snd = new Audio(sound.previews['preview-hq-mp3']);
    //             msg += '<br><button onclick="snd.play()">play</button><button onclick="snd.pause()">pause</button><br><br>';
    //             displayMessage(msg,'resp1');                    

    //             // When we have printed some sound info, ask for analysis
    //             sound.getAnalysis(null,function(analysis){
    //                 msg += "<strong>Mfccs:</strong><ul>";
    //                 for (i in analysis.lowlevel.mfcc.mean){
    //                     msg += "<li>" + analysis.lowlevel.mfcc.mean[i] + "</li>"
    //                 }
    //                 msg += "</ul>";
    //                 displayMessage(msg,'resp1')

    //                 // When we have printed the analysis, ask for similar sounds
    //                 sound.getSimilar(function(sounds){
    //                     msg += "<strong>Similar sounds:</strong><ul>";
                        
    //                     for (i =0;i<=10;i++){                                
    //                         var snd = sounds.getSound(i);
    //                         msg += "<li>" + snd.id + ": " + snd.url + "</li>"
    //                     }
    //                     msg += "</ul>";

    //                     displayMessage(msg,'resp1')
    //                 }, function(){ displayError("Similar sounds could not be retrieved.")},
    //                 {fields:fields});
    //             }, function(){ displayError("Analysis could not be retrieved.")},
    //             true);// showAll
    //         }, function(){ displayError("Sound could not be retrieved.")}
    // );
    
    
    // Example 2
    // Example of searching sounds: querying the freesound db for sounds
    // $("#queryBtn").click(function(){
    //     debugger
    //     var query = $("#queryInput")[0].value;
    //     var page = 1
    //     var filter = "duration:[0 TO 60]"
    //     var sort = "rating_desc"
    //     freesound.textSearch(query, {page:page, filter:filter, sort:sort, fields:fields},
    //         function(sounds){
    //             var msg = ""
                
    //             msg += "Num results: " + sounds.count + "<br><ul>"
    //             for (i =0;i<=14;i++){  
    //                 var snd = sounds.getSound(i);
    //                 msg += "<li>" + snd.name + " by " + snd.username + " with id: " + snd.id + "</li>"
    //                 // msg += "<img src='" + snd.images.waveform_l + "'>";
    //                 console.log(snd);
    //             }
    //             msg += "</ul>"
                
    //             $("#freesoundPartial").innerHTML = msg;
    //         },function(){ $("#error").innerHTML = "Error while searching..."}
    //     );
    // })
  
};