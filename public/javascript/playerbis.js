class playCtx {
  constructor(playCtx){
    this.index;
    this.songPath;
    this.songPlayback;

    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.source;
    this.songLength;
  }

  getData() {
    this.source = audioCtx.createBufferSource();
    request = new XMLHttpRequest();
    request.open('GET', `/songs/${this.songPath}`, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      var audioData = request.response;
      this.audioCtx.decodeAudioData(audioData, function(buffer) {
          myBuffer = buffer;
          this.songLength = buffer.duration;
          this.source.buffer = myBuffer;
          this.source.playbackRate.value = this.songPlayback;
          this.source.connect(this.audioCtx.destination);
          this.source.loop = true;
        },
        function(e){"Error with decoding audio data" + e.error});
    }
    request.send();
  }

}



