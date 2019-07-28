var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var source;
var songLength;

var play = document.querySelector('.play');
var stop = document.querySelector('.stop');

var playbackControl = document.querySelector('.playback-rate-control');
var playbackValue = document.querySelector('.playback-rate-value');
playbackControl.setAttribute('disabled', 'disabled');

function getData() {
  source = audioContext.createBufferSource();
  request = new XMLHttpRequest();

  request.open('GET', 'songs/factor.mp3', true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    var audioData = request.response;

    audioContext.decodeAudioData(audioData, function(buffer) {
        songLength = buffer.duration;
        source.buffer = buffer;
        source.playbackRate.value = playbackControl.value;
        source.connect(audioContext.destination);
      },

      function(e){"Error with decoding audio data" + e.error});

  }

  request.send();
}

// wire up buttons to stop and play audio, and range slider control

play.onclick = function() {
  getData();
  source.start(0);
  play.setAttribute('disabled', 'disabled');
  playbackControl.removeAttribute('disabled');
}

stop.onclick = function() {
  source.stop(0);
  play.removeAttribute('disabled');
  playbackControl.setAttribute('disabled', 'disabled');
}

playbackControl.oninput = function() {
  source.playbackRate.value = playbackControl.value;
  playbackValue.innerHTML = playbackControl.value;
}

