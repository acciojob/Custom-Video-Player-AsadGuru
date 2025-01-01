/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// function to update the progress bar
function updateProgress() {
	const progressPercentage = (video.currentTime / video.duration) * 100;
	progressBar.style.width = `${progressPercentage}%`;
}

// function to scrub the video when clicking on the progress Bar
function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

// function to handle skip buttons
function skip() {
	const skipAmount = parseFloat(this.dataset.skip);
	video.currentTime += skipAmount;
}

// function to handle range inputs(volume and playback speed) 
function handleRangeUpdate() {
	const name = this.name;
	if (name=== 'volume') {
		video.volume = this.value;
	} else if (name === 'playbackRate'){
		video.playbackRate = this.value;
	}
}

// event Listeners
toggle.addEventListener('click', togglePlayPause);
video.addEventListener('click', togglePlayPause);
progress.addEventListener('click', scrub);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

// Optional: Update progress bar while scrubbing (mouse move when button is held down)
progress.addEventListener('mousemove', (e) => {
    if (e.buttons === 1) {
        scrub(e); // Only scrub when mouse button is held down
    }
});

// Update progress bar as the video plays
video.addEventListener('timeupdate', updateProgress);
