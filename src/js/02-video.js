import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const TIME_PLAYED = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

const savedTime = JSON.parse(localStorage.getItem(TIME_PLAYED));

if (!savedTime) {
  localStorage.setItem(TIME_PLAYED, '0');
}

// sync player time from previous session
player.setCurrentTime(localStorage.getItem(TIME_PLAYED));

function timeupdateCallback({ seconds }) {
  localStorage.setItem(TIME_PLAYED, seconds);
  console.log('timeupdate!', localStorage.getItem(TIME_PLAYED));
}

player.on('timeupdate', throttle(timeupdateCallback, 1000));
