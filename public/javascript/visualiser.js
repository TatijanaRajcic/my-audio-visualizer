// Hacks to deal with different function names in different browsers
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function(callback, element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

window.AudioContext = (function(){
    return  window.webkitAudioContext || window.AudioContext || window.mozAudioContext;
})();

// Global Variables for Audio
var audioContext;
var audioBuffer;
var sourceNode;
var analyserNode;
var javascriptNode;
var convolverGain;
var audioData = null;
var audioPlaying = false;
var sampleSize = 1024;  // number of samples to collect before analyzing data
var amplitudeArray;     // array to hold time domain data
var audioUrl = `/songs/${songPath}`; // This must be hosted on the same server as this page - otherwise you get a Cross Site Scripting error

// Global Variables for the Graphics
var canvasWidth  = 1000;
var canvasHeight = 150;
var ctx;
var color = document.getElementById('color-visual');

// Global Variables for Inputs
var playbackControl = document.querySelector('.playback-rate-control');
playbackControl.setAttribute('disabled', 'disabled');
var playbackValue = document.querySelector('.playback-rate-value');
var valueType = document.querySelector('.type-visual');
var convolverGainControl = document.querySelector('.convolver-gain-control');
var convolverGainValue = document.querySelector('.convolver-gain-value');
convolverGainControl.setAttribute('disabled', 'disabled');

// Functions

function setupAudioNodes() {
    sourceNode     = audioContext.createBufferSource();
    analyserNode   = audioContext.createAnalyser();
    javascriptNode = audioContext.createScriptProcessor(sampleSize, 1, 1);
    // convolverGain = audioContext.createGain();
    // convolverNode = audioContext.createConvolver();
    // masterGain = audioContext.createGain();
    // masterCompression = audioContext.createDynamicsCompressor();
    // Create the array for the data values
    amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);
    // Now connect the nodes together
    // sourceNode.loop = true;
    // sourceNode.connect(convolverGain);
    // sourceNode.connect(convolverNode);
    // sourceNode.connect(masterGain);
    // masterGain.connect(masterCompression);
    // masterCompression.connect(audioContext.destination);
    sourceNode.connect(audioContext.destination);
    sourceNode.connect(analyserNode);
    analyserNode.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);
    sourceNode.playbackRate.value = playbackControl.value
}
// Load the audio from the URL via Ajax and store it in global variable audioData
// Note that the audio load is asynchronous

function loadSound(url) {
    request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    // When loaded, decode the data and play the sound
    request.onload = function () {
        audioContext.decodeAudioData(request.response, function (buffer) {
            audioData = buffer;
            playSound(audioData);
        }, onError);
    }
    request.send();
    // getImpulse();
    // document.querySelector('.convolver-gain-control').value = '0';
    // document.querySelector('.convolver-gain-control').addEventListener('change', function() {
    // convolverGainControl.value = this.value;
    // });
}

// function getImpulse() {
//     convolver = audioContext.createConvolver(); 
//     ajaxRequest = new XMLHttpRequest();
//     ajaxRequest.open('GET', audioUrl, true);
//     ajaxRequest.responseType = 'arraybuffer';
  
//     ajaxRequest.onload = function() {
//       var impulseData = ajaxRequest.response;
  
//       audioContext.decodeAudioData(impulseData, function(buffer) {
//           myImpulseBuffer = buffer;
//           convolver.buffer = myImpulseBuffer;
//           convolver.loop = true;
//           convolver.normalize = true;
//           convolverGain.gain.value = 3;
//           convolverGain.connect(convolver);
//           convolver.connect(masterGain);
//         },
  
//         function(e){"Error with decoding audio data" + e.err});
  
//     }
  
//     ajaxRequest.send();
//   }

// Play the audio and loop until stopped
function playSound(buffer) {
    sourceNode.buffer = buffer;
    sourceNode.start(0);    // Play the sound now
    sourceNode.loop = true;
    audioPlaying = true;
}

function onError(e) {
    console.log(e);
}

function drawTimeDomainBars() {
  clearCanvas();
  ctx.fillStyle = color.value; // Color of the bars
  bars = 100;
  for (var i = 0; i < bars; i++) {
    bar_x = i * 3;
    bar_width = 2;
    bar_height = -(amplitudeArray[i] / 2);
    //  fillRect( x, y, width, height ) // Explanation of the parameters below
    ctx.fillRect(bar_x, canvasHeight, bar_width, bar_height);
  }
}

function drawTimeDomainLines() {
    clearCanvas();
    for (var i = 0; i < amplitudeArray.length; i++) {
        var value = amplitudeArray[i] / 256;
        var y = canvasHeight - (canvasHeight * value) - 1;
        ctx.fillStyle = color.value; //color of the lines
        ctx.fillRect(i, y, 1, 1);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function screenshotCanvas() {
    var canvas = document.getElementById('visualiser-canvas');
    var dataURL = canvas.toDataURL();
    var screenshot = document.getElementsByClassName("screenshot")[0];
    screenshot.value = dataURL;
}

// Execute

$(document).ready(function() {
    ctx = $("#visualiser-canvas").get()[0].getContext("2d");
    // the AudioContext is the primary 'container' for all your audio node objects
    try {
        audioContext = new AudioContext();
    } catch(e) {
        alert('Web Audio API is not supported in this browser');
    }
    // When the Start button is clicked, finish setting up the audio nodes, play the sound,
    // gather samples for the analysis, update the canvas
    $("#start_button").on('click', function(e) {
        e.preventDefault();
        // Set up the audio Analyser, the Source Buffer and javascriptNode
        setupAudioNodes();
        // setup the event handler that is triggered every time enough samples have been collected
        // trigger the audio analysis and draw the results
        javascriptNode.onaudioprocess = function () {
            // get the Time Domain data for this sampleaudioContext
            analyserNode.getByteTimeDomainData(amplitudeArray);
            // draw the display if the audio is playing
            if (audioPlaying == true && valueType.value === "bars") {
                requestAnimFrame(drawTimeDomainBars);
            } else if (audioPlaying == true && valueType.value ==="lines") {
                requestAnimFrame(drawTimeDomainLines);
            }
        }
        // Load the Audio the first time through, otherwise play it from the buffer
        if(audioData == null) {
            loadSound(audioUrl);
        } else {
            playSound(audioData);
        }
        $("#start_button").attr('disabled', 'disabled');
        playbackControl.removeAttribute('disabled');
        // convolverGainControl.removeAttribute('disabled');
    });
    // Stop the audio playing
    $("#stop_button").on('click', function(e) {
        e.preventDefault();
        sourceNode.stop(0);
        $("#start_button").removeAttr('disabled');
        playbackControl.setAttribute('disabled', 'disabled');
        // convolverGainControl.setAttribute('disabled', 'disabled');
        audioPlaying = false;
    });

    $("#save_button").on('click', function(e) {
        screenshotCanvas()
    });
});

playbackControl.oninput = function() {
    sourceNode.playbackRate.value = playbackControl.value;
    playbackValue.innerHTML = playbackControl.value;
}

convolverGainControl.oninput = function() {
    convolverGain.gain.value = convolverGainControl.value;
    convolverGainValue.innerHTML = convolverGainControl.value;
  }