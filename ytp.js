let plyr;

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event)
{
  /*if (event.origin !== "http://example.org:8080")
    return;*/
  switch(e.data.actionType){
    case 'play':
      plyr.playVideo();
      break;
    case 'pause':
      plyr.pauseVideo();
      break;
    case 'mute':
      plyr.mute();
      break;
    case 'unMute':
      plyr.unMute();
      break;
    case 'seekTo':
      plyr.seekTo(e.data.to);
      break;
    case 'setVolume':
      plyr.setVolume(e.data.volume);
      break;
    case 'setShuffle':
      plyr.setShuffle(e.data.shuffle);
      break;
    case 'setLoop':
      plyr.setLoop(e.data.loop);
    case 'getState':
      e.data.getState(plyr.getPlayerState());
      break;
    case 'getCurrentTime':
      e.data.getCurrentTime(plyr.getCurrentTime());
      break;
    case 'getDuration':
      e.data.getDuration(plyr.getDuration());
      break;     
    case 'loadVideoById':
      plyr.loadVideoById({videoId:e.data.vidId, suggestedQuality:'tiny'});
  }
}


// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
// Load the IFrame Player API code asynchronously.
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/player_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.onYouTubePlayerAPIReady = () => {

  plyr= new YT.Player('ytplayer', {
    width: '200',
    height: '100',
    playerVars: {
      rel:0,
      showinfo: 0,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      widget_referrer: 'https://headsetapp.co'
    },
    events: {
      onReady() {
          window.parent.postMessage('ready','http://localhost:3000');
          //window.parent.postMessage('ready','http://localhost:3000');
      },
      onStateChange(e) {
      },
    },
  });
};
