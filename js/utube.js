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
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
  saveTake();
}