// source: https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player

var videoWidth = 720;
var videoHeight = 480;

// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('myVideo', {
    height: videoHeight,
    width: videoWidth,
    videoId: 'lVFNRrL79w0',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
        loop: true,
        controls: false,
        showinfo: false
    }
  });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.mute();
}

//    The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
  console.log(event.data);
  if (event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED) {
    stopVideo();
  }
}

function stopVideo() {
  player.stopVideo();
  flushNotes();
  saveTake();
}

function playVideo() {
  player.seekTo(0);
  player.playVideo();
  startTake();
}