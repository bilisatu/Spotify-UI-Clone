document.querySelectorAll('.like-btn').forEach(function(btn) {
  btn.setAttribute('aria-pressed', 'false');
  btn.addEventListener('click', function() {
    const isLiked = btn.classList.toggle('liked');
    btn.setAttribute('aria-pressed', isLiked ? 'true' : 'false');
  });
});

(function() {
  const playBtn = document.querySelector('.play-btn');
  const prevBtn = document.querySelector('.control-btn[aria-label="Previous"]');
  const nextBtn = document.querySelector('.control-btn[aria-label="Next"]');
  const shuffleBtn = document.querySelector('.control-btn[aria-label="Shuffle"]');
  const repeatBtn = document.querySelector('.control-btn[aria-label="Repeat"]');
  const progressFill = document.querySelector('.progress-fill');
  const timeCurrent = document.querySelector('.time-current');
  const timeTotal = document.querySelector('.time-total');
  const volumeBar = document.querySelector('.volume-bar');
  const volumeFill = document.querySelector('.volume-fill');

  const audio = document.getElementById('audio-player');

  const trackTitleEl = document.querySelector('.track-details .track-name:nth-child(1)');
  const trackArtistEl = document.querySelector('.track-details .track-name:nth-child(2)');
  const albumCoverEl = document.querySelector('.album-cover');

  const tracks = [
    {
      id: 'focus-beats',
      title: 'Focus Beats',
      artist: 'Safraeel',
      cover: 'media/covers/focus-beats.jpg',
      src: 'media/track1.mp3',
      duration: 225
    },
    {
      id: 'late-night-code',
      title: 'Late Night Code',
      artist: 'Safraeel',
      cover: 'media/covers/late-night-code.jpg',
      src: 'media/track2.mp3',
      duration: 252
    },
    {
      id: 'morning-drive',
      title: 'Morning Drive',
      artist: 'Safraeel',
      cover: 'media/covers/Morning-Drive.jpg',
      src: 'media/track3.mp3',
      duration: 210
    },
    {
      id: 'sunset-vibes',
      title: 'Sunset Vibes',
      artist: 'Safraeel',
      cover: 'media/covers/sunset-vibes.jpg',
      src: 'media/track4.mp3',
      duration: 240
    }
  ];

  let currentTrackIndex = 0;
  let currentSec = 0;
  let durationSec = tracks[0].duration;
  let isMuted = false;
  let volume = 1;

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function renderTrack() {
    const t = tracks[currentTrackIndex];
    if (!t) return;
    trackTitleEl.textContent = t.title;
    trackArtistEl.textContent = t.artist;
    albumCoverEl.style.backgroundImage = `url("${t.cover}")`;
    if (t.src) {
      audio.src = t.src;
    }
    durationSec = t.duration;
    timeTotal.textContent = formatTime(durationSec);
    currentSec = 0;
    progressFill.style.width = '0%';
    timeCurrent.textContent = '0:00';
  }

  function setPlaying(state) {
    playBtn.classList.toggle('playing', state);
    playBtn.innerHTML = state
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5H11V19H9V5Z" fill="currentColor"/><path d="M13 5H15V19H13V5Z" fill="currentColor"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5V19L18 12L8 5Z" fill="currentColor"/></svg>';
    if (state) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }

  function goToTrack(index) {
    if (index < 0) index = tracks.length - 1;
    if (index >= tracks.length) index = 0;
    currentTrackIndex = index;
    renderTrack();
    setPlaying(true);
  }

  function showNowPlayingToast() {
    const existing = document.querySelector('.now-playing-toast');
    if (existing) existing.remove();

    const t = tracks[currentTrackIndex];
    if (!t) return;

    const toast = document.createElement('div');
    toast.className = 'now-playing-toast';
    toast.textContent = `Now playing: ${t.title} — ${t.artist}`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 250);
    }, 2500);
  }

  playBtn.addEventListener('click', () => {
    const nowPlaying = !playBtn.classList.contains('playing');
    setPlaying(nowPlaying);
  });

  prevBtn?.addEventListener('click', () => {
    goToTrack(currentTrackIndex - 1);
    showNowPlayingToast();
  });

  nextBtn?.addEventListener('click', () => {
    const isShuffle = shuffleBtn?.classList.contains('active');
    if (isShuffle && tracks.length > 1) {
      let nextIdx = currentTrackIndex;
      while (nextIdx === currentTrackIndex) {
        nextIdx = Math.floor(Math.random() * tracks.length);
      }
      goToTrack(nextIdx);
    } else {
      goToTrack(currentTrackIndex + 1);
    }
    showNowPlayingToast();
  });

  shuffleBtn?.addEventListener('click', () => shuffleBtn.classList.toggle('active'));
  repeatBtn?.addEventListener('click', () => repeatBtn.classList.toggle('active'));

  const clickableCards = document.querySelectorAll('[data-track-index]');
  clickableCards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-track-index'), 10);
      if (!isNaN(idx) && tracks[idx]) {
        goToTrack(idx);
        showNowPlayingToast();
      }
    });
  });

  const progressTrack = document.querySelector('.progress-track');
  progressTrack?.addEventListener('click', (e) => {
    const rect = progressTrack.getBoundingClientRect();
    const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    currentSec = durationSec * pct;
    audio.currentTime = currentSec;
    progressFill.style.width = `${pct * 100}%`;
    timeCurrent.textContent = formatTime(currentSec);
  });

  volumeBar?.addEventListener('click', (e) => {
    const rect = volumeBar.getBoundingClientRect();
    const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    volume = pct;
    audio.volume = volume;
    volumeFill.style.width = `${pct * 100}%`;
    isMuted = pct === 0;
  });

  audio.addEventListener('timeupdate', () => {
    if (!isFinite(audio.duration) || audio.duration === 0) return;
    currentSec = audio.currentTime;
    durationSec = audio.duration;
    const pct = Math.min(currentSec / durationSec, 1);
    progressFill.style.width = `${pct * 100}%`;
    timeCurrent.textContent = formatTime(currentSec);
    timeTotal.textContent = formatTime(durationSec);
  });

  audio.addEventListener('ended', () => {
    const isRepeat = repeatBtn?.classList.contains('active');
    if (isRepeat) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } else {
      const isShuffle = shuffleBtn?.classList.contains('active');
      if (isShuffle && tracks.length > 1) {
        let nextIdx = currentTrackIndex;
        while (nextIdx === currentTrackIndex) {
          nextIdx = Math.floor(Math.random() * tracks.length);
        }
        goToTrack(nextIdx);
      } else {
        goToTrack(currentTrackIndex + 1);
      }
    }
  });

  window.addEventListener('keydown', (e) => {
    const tag = e.target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;

    if (e.code === 'Space') {
      e.preventDefault();
      const nowPlaying = !playBtn.classList.contains('playing');
      setPlaying(nowPlaying);
    } else if (e.code === 'ArrowRight') {
      e.preventDefault();
      nextBtn?.click();
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault();
      prevBtn?.click();
    }
  });

  renderTrack();
  setPlaying(false);
  showNowPlayingToast();
})();
