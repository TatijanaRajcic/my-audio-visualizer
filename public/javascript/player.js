var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source;
var songLength;

var play = document.getElementsByClassName('start_button_details')[`${index}`];
var stop = document.getElementsByClassName('stop_button_details')[`${index}`];
debugger

function getData() {
  source = audioCtx.createBufferSource();
  request = new XMLHttpRequest();
  request.open('GET', `/songs/${songPath}`, true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        myBuffer = buffer;
        songLength = buffer.duration;
        source.buffer = myBuffer;
        source.playbackRate.value = songPlayback;
        source.connect(audioCtx.destination);
        source.loop = true;
      },
      function(e){"Error with decoding audio data" + e.error});
  }
  request.send();
}
// wire up buttons to stop and play audio, and range slider control
play.onclick = function() {
  getData();
  source.start(0);
}
stop.onclick = function() {
  source.stop(0);
}