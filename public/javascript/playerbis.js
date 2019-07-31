class playCtx {
  constructor(playCtx) {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.cache = {};
  }

  getData(songPath,songPlayback) {
    let source = this.audioCtx.createBufferSource();
    source.playbackRate.value = songPlayback;
    source.connect(this.audioCtx.destination);
    source.loop = true;
    
    if (this.cache[songPath]) {
      source.buffer = buffer;
      source.start(0);
      return source
    }
    let request = new XMLHttpRequest();
    request.open("GET", `/songs/${songPath}`, true);
    request.responseType = "arraybuffer";
    request.onload = function() {
      var audioData = request.response;
      console.log("hello");
      this.audioCtx.decodeAudioData(
        audioData,
        function(buffer) {
          source.buffer = buffer;
          source.start(0);
        }.bind(this),
        function(e) {
          console.log("Error with decoding audio data" + e.error);
        }
      );
    }.bind(this);
    request.send();
    debugger
    return source;
  }
}
