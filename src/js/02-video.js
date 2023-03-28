import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const TIME_PLAYED = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

// sync player time from previous session
(() => {
  player
    .setCurrentTime(localStorage.getItem(TIME_PLAYED))
    .then(() => {
      console.log('synced player time from last session!');
    })
    .catch(function (error) {
      console.error(error);
    });
})();

function timeupdateCallback({ seconds }) {
  localStorage.setItem(TIME_PLAYED, seconds);
  console.log('timeupdate!', localStorage.getItem(TIME_PLAYED));
}

player.on('timeupdate', throttle(timeupdateCallback, 1000));
