let plyr;
let es;
let eo;

window.addEventListener("init", init, false);

function init(event)
{
  /*if (event.origin !== "http://example.org:8080")
    return;*/
  es = event.source;
  eo = event.origin;
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
          //es.postMessage("init",eo,plyr);
          window.parent.postMessage("init","http://localhost:3000","ready");
      },
      onStateChange(e) {
      },
    },
  });
};
