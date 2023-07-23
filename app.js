let playListContainerTag = document.querySelector(".playListContainer");
let currentandTotalTimeTag = document.querySelector(".currentandTotalTime");
let currentProgressTag = document.getElementById("currentProgress");
const nextButtonTag = document.querySelector(".nextButton");
const previousButtonTag = document.querySelector(".previousButton");
const pauseButtonTag = document.querySelector(".pauseButton");
const playButtonTag = document.querySelector(".playButton");
const audioTag = document.querySelector(".audioTag");

const tracks = [
	{ trackId: "music/water1.mp3", title: "Song 1" },
	{ trackId: "music/water2.mp3", title: "Song 2" },
	{ trackId: "music/water3.mp3", title: "Song 3" },
	{ trackId: "music/fdx.mp3", title: "song 4" },
];

for (let i = 0; i < tracks.length; i++) {
	const trackTag = document.createElement("div");
	trackTag.addEventListener("click", () => {
		const trackID = tracks[i].trackId;
		audioTag.src = trackID;
		isPlaying = true;
		audioTag.play();
		updatePlayAndPause();
		currentPlayIndex = i;
	});
	trackTag.classList.add("trackItem");
	const title = (i + 1).toString() + ". " + tracks[i].title;
	trackTag.textContent = title;
	playListContainerTag.append(trackTag);
}
 
let duration;
let durationText = " 00:00";
audioTag.addEventListener("loadeddata", () => {
	duration = Math.floor(audioTag.duration);

	durationText = createSecAndMin(duration);
});

audioTag.addEventListener("timeupdate", () => {
	let currentTime = Math.floor(audioTag.currentTime);
	let currentTimeText = createSecAndMin(currentTime);
	let currentAndDurationText = currentTimeText + " / " + durationText;
	currentandTotalTimeTag.textContent = currentAndDurationText;
	updateCurrentProgress(currentTime);
});

function updateCurrentProgress(currentTime) {
	let currentProgressWidth = (25 / duration) * currentTime;
	currentProgressTag.style.width = currentProgressWidth.toString() + "em";
}

function createSecAndMin(sec) {
	const minutes = Math.floor(sec / 60);
	const seconds = sec % 60;

	const secText = seconds < 10 ? "0" + seconds.toString() : seconds;
	const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
	return minuteText + ":" + secText;
}

let isPlaying = false;
let currentPlayIndex = 0;

playButtonTag.addEventListener("click", () => {
	isPlaying = true;
	let currentTime = Math.floor(audioTag.currentTime);
	let wantToPlay = tracks[currentPlayIndex].trackId;
	if (currentTime == 0) {
		audioTag.src = wantToPlay;

		audioTag.play();
		updatePlayAndPause();
	} else {
		audioTag.play();
		updatePlayAndPause();
	}
});

pauseButtonTag.addEventListener("click", () => {
	isPlaying = false;
	audioTag.pause();
	updatePlayAndPause();
});

function updatePlayAndPause() {
	if (isPlaying) {
		changeDisplay(pauseButtonTag, "block");
		changeDisplay(playButtonTag, "none");
	} else {
		changeDisplay(pauseButtonTag, "none");
		changeDisplay(playButtonTag, "block");
	}
}

function changeDisplay(tag, disMode) {
	tag.style.display = disMode;
}

previousButtonTag.addEventListener("click", () => {
if(currentPlayIndex === 0) {
	let preViousMusic = tracks.length-1;
	currentPlayIndex = preViousMusic;
	const wantToPlay = tracks[currentPlayIndex].trackId;
	audioTag.src= wantToPlay;
	audioTag.play();
	isPlaying = true;
	updatePlayAndPause()
	return;
// let	previousPlay = tracks.length-1;
} else {
	currentPlayIndex -= 1;
	const wantToPlay = tracks[currentPlayIndex].trackId;
	audioTag.src= wantToPlay;
	audioTag.play();
	isPlaying = true;
	updatePlayAndPause()
}

})

nextButtonTag.addEventListener("click", () => {
if(currentPlayIndex === tracks.length-1) {
	let nextMusic = 0;
	currentPlayIndex = nextMusic;
	const wantToPlay = tracks[currentPlayIndex].trackId;
	audioTag.src= wantToPlay;
	audioTag.play();
	isPlaying = true;
	updatePlayAndPause();
	return
}
currentPlayIndex +=1;
const wantToPlay = tracks[currentPlayIndex].trackId;
audioTag.src= wantToPlay;
audioTag.play();
isPlaying = true;
updatePlayAndPause()
})
