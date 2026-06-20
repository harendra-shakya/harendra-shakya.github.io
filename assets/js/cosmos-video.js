(function () {
  'use strict';

  const video = document.getElementById('cosmos-video');
  if (!video) return;

  const playBtn = document.getElementById('cosmos-video-play');
  const muteBtn = document.getElementById('cosmos-video-mute');

  function swapIcon(btn, show, hide) {
    btn.querySelector(show).hidden = false;
    btn.querySelector(hide).hidden = true;
  }

  function phCapture(event, props) {
    if (typeof posthog !== 'undefined') posthog.capture(event, props);
  }

  playBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      swapIcon(playBtn, '.icon-pause', '.icon-play');
      playBtn.setAttribute('aria-label', 'Pause video');
      phCapture('video_played', { location: 'homepage' });
    } else {
      video.pause();
      swapIcon(playBtn, '.icon-play', '.icon-pause');
      playBtn.setAttribute('aria-label', 'Play video');
    }
  });

  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    if (video.muted) {
      swapIcon(muteBtn, '.icon-muted', '.icon-unmuted');
      muteBtn.setAttribute('aria-label', 'Unmute video');
    } else {
      swapIcon(muteBtn, '.icon-unmuted', '.icon-muted');
      muteBtn.setAttribute('aria-label', 'Mute video');
      phCapture('video_unmuted', { location: 'homepage' });
    }
  });
})();
