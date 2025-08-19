// Create audio element
const audioElement = document.createElement('audio');
document.body.appendChild(audioElement);

// Select DOM elements
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const Voice = document.getElementById('Voice');
const cover = document.getElementById('cover');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-bar');
const volumeSlider = document.getElementById('volume');
const speedSelect = document.getElementById('speed');

// Quraan data


const songs = [
    { title: 'Al-Fatihah', Voice: 'Saud Al-Shuraim', cover:'https://play-lh.googleusercontent.com/0iU-BmqGjCz8-L7X8W_YcLHwZE8IRy9jNa6_CP1y5CSViHlLjYLW7XKdzkAbGn4Z1Y4', src: 'https://server7.mp3quran.net/shur/001.mp3' },

    { title: 'Al-Baqarah', Voice: 'Saud Al-Shuraim', cover:'https://play-lh.googleusercontent.com/0iU-BmqGjCz8-L7X8W_YcLHwZE8IRy9jNa6_CP1y5CSViHlLjYLW7XKdzkAbGn4Z1Y4', src: 'https://server7.mp3quran.net/shur/002.mp3' },

    { title: 'Al-Imran', Voice: 'Saud Al-Shuraim', cover:'https://play-lh.googleusercontent.com/0iU-BmqGjCz8-L7X8W_YcLHwZE8IRy9jNa6_CP1y5CSViHlLjYLW7XKdzkAbGn4Z1Y4', src: 'https://server7.mp3quran.net/shur/003.mp3' },
    { title: '', Voice: 'Saud Al-Shuraim', cover:'https://play-lh.googleusercontent.com/0iU-BmqGjCz8-L7X8W_YcLHwZE8IRy9jNa6_CP1y5CSViHlLjYLW7XKdzkAbGn4Z1Y4', src: '' },

    // { title: '', Voice: 'Saud Al-Shuraim', cover:'https://play-lh.googleusercontent.com/0iU-BmqGjCz8-L7X8W_YcLHwZE8IRy9jNa6_CP1y5CSViHlLjYLW7XKdzkAbGn4Z1Y4', src: '' },
    
      
];

// Keep track of songs
let soundIndex = 0;
let isPlaying = false;
let speed = 1;

// Update Quraan details
function loadSong(song) {
    title.textContent = song.title;
    Voice.textContent = song.Voice;
    cover.src = song.cover;
    audioElement.src = song.src;
}

// Initially load Quraan details into DOM
loadSong(songs[soundIndex]);

// Play Quraan
function playSong() {
    playBtn.querySelector('i').classList.remove('fa-play');
    playBtn.querySelector('i').classList.add('fa-pause');
    audioElement.play().catch(e => console.error("Error playing audio:", e));
    isPlaying = true;
}

// Pause Quraan
function pauseSong() {
    playBtn.querySelector('i').classList.remove('fa-pause');
    playBtn.querySelector('i').classList.add('fa-play');
    audioElement.pause();
    isPlaying = false;
}

// Previous Quraan
function prevSong() {
    pauseSong();
    setTimeout(() => {
        soundIndex--;
        if (soundIndex < 0) {
            soundIndex = songs.length - 1;
        }
        loadSong(songs[soundIndex]);
        playSong();
    }, 300);
}

// Next Quraan
function nextSong() {
    pauseSong();
    setTimeout(() => {
        soundIndex++;
        if (soundIndex > songs.length - 1) {
            soundIndex = 0;
        }
        loadSong(songs[soundIndex]);
        playSong();
    }, 300);
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (isNaN(duration)) return;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    
    // Update duration Element
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    
    // Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    audioElement.playbackRate = speed;
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioElement.duration;
    if (isNaN(duration)) return;
    const newTime = (clickX / width) * duration;

  // isFinite() is a JavaScript function that determines whether a value is a finite number. It returns true if the value is a number that is not positive infinity, negative infinity, or NaN (Not-a-Number).

    if (isFinite(newTime)) {
        audioElement.currentTime = newTime;
    }
}

// Event listeners
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change Quraan
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audioElement.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Quraan ends
audioElement.addEventListener('ended', nextSong);

// Change volume
volumeSlider.addEventListener('input', (e) => {
    audioElement.volume = e.target.value;
});

// Change speed
speedSelect.addEventListener('change', (e) => {
    speed =  parseFloat(e.target.value);
    audioElement.playbackRate = speed;
});

// Load metadata
audioElement.addEventListener('loadedmetadata', updateProgress);