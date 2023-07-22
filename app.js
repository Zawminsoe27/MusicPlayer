

const playListContainerTag = document.querySelector(".playListContainer");
let currentandTotalTimeTag = document.querySelector(".currentandTotalTime")
const nextButtonTag = document.querySelector(".nextButton");
const previousButtonTag = document.querySelector(".previousButton");
const pauseButtonTag = document.querySelector(".pauseButton");
const playButtonTag = document.querySelector(".playButton");
const audioTag = document.querySelector(".audioTag");
const tracks = [
	{ trackId: "music/fdo.mp3", title: "Song 1" },
	{ trackId: "music/fcc.mp3", title: "Song 2" },
	{ trackId: "music/fdn.mp3", title: "Song 3" },
	{ trackId: "music/fdx.mp3", title: "song 4" },
];

for (let i = 0; i < tracks.length; i++) {
	const trackTag = document.createElement("div");
	trackTag.addEventListener("click", () => {
		const trackID = tracks[i].trackId;
		audioTag.src = trackID;
		audioTag.play();
	});
	trackTag.classList.add("trackItem");
	const title = (i + 1).toString() + ". " + tracks[i].title;
	trackTag.textContent = title;
	playListContainerTag.append(trackTag);
}
let durationText =" 00:00" ;
audioTag.addEventListener("loadeddata", () => {
	const duration = Math.floor(audioTag.duration);

	durationText = createSecAndMin(duration)

});

audioTag.addEventListener("timeupdate", () => {
	let currentTime = Math.floor(audioTag.currentTime);
	let currentTimeText = createSecAndMin(currentTime);
	let currentAndDurationText = currentTimeText + " / " + durationText;
	currentandTotalTimeTag.textContent = currentAndDurationText
});

function createSecAndMin(sec) {
	const minutes = Math.floor(sec / 60);
	const seconds = sec % 60;

	const secText = seconds < 10 ? "0" + seconds.toString() : seconds;
	const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
	return minuteText + ":" + secText;
}
