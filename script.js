```javascript
'use strict';

const params = new URLSearchParams(location.search);
const name = (params.get('name') || 'Dear Friend').trim().slice(0, 60) || 'Dear Friend';
const from = (params.get('from') || '').trim().slice(0, 60);

document.getElementById('recipient').textContent = name;
document.title = `A Birthday Surprise for ${name} ✨`;

function makeLink(link) {
  const url = new URL(link.href, location.href);
  if (params.has('name')) url.searchParams.set('name', name);
  if (from) url.searchParams.set('from', from);
  link.href = url.href;
}
document.querySelectorAll('.card, #openSurprise').forEach(makeLink);

const audio = document.getElementById('birthdayAudio');
const musicBtn = document.getElementById('musicToggle');
const status = document.getElementById('musicStatus');

musicBtn.addEventListener('click', async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicBtn.textContent = 'Ⅱ Pause Music';
      status.textContent = 'Your birthday song is playing 🎶';
    } catch {
      status.textContent = 'Music could not play. Check the MP3 file path.';
    }
  } else {
    audio.pause();
    musicBtn.textContent = '▶ Play Music';
    status.textContent = 'Music paused. Play it whenever you like.';
  }
});

audio.addEventListener('error', () => {
  status.textContent = 'Add happy-birthday.mp3 to assets/audio.';
});
```
