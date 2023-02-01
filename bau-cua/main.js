const ROLL_TIMES = 10;
const DELAY_BETWEEN_SOUNDS = 150;
const preload_1 = new Audio('audio/metal_1.wav');
const preload_2 = new Audio('audio/metal_2.wav');

const cover = document.querySelector('#cover');
const openBtn = document.querySelector('#open-btn');
const closeBtn = document.querySelector('#close-btn');
const rollBtn = document.querySelector('#roll-btn');
const dice = document.querySelectorAll('.dice');
const volumeSlider = document.querySelector('#volume-slider');

openBtn.addEventListener('click', openCover);
closeBtn.addEventListener('click', closeCover);
rollBtn.addEventListener('click', diceRoll);
volumeSlider.addEventListener('change', onVolumeChange);

function openCover() {
	cover.setAttribute('data-open', 'true');
	// could also set play sound to false
}

function closeCover() {
	cover.setAttribute('data-open', 'false');
	// could also set play sound to true
}

function onVolumeChange(e) {
	// set volume of audio
	volume = e.target.value / 100;
}

let volume = 0.5;

const diceFormation = {
	0: {
		x: 0,
		y: 0,
		z: 0,
	},
	1: {
		x: 0,
		y: 0,
		z: 0,
	},
	2: {
		x: 0,
		y: 0,
		z: 0,
	},
};

function roll(dice, times, index) {
	if (times === 0) {
		// round to number divisible by 90 so everything lies correctly
		const x = Math.round(diceFormation[index].x / 90) * 90;
		const y = Math.round(diceFormation[index].y / 90) * 90;
		const z = Math.round(diceFormation[index].z / 90) * 90;
		dice.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
		return;
	}
	const x = Math.floor(Math.random() * 360);
	const y = Math.floor(Math.random() * 360);
	const z = Math.floor(Math.random() * 360);
	diceFormation[index].x = x;
	diceFormation[index].y = y;
	diceFormation[index].z = z;
	dice.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;

	setTimeout(() => {
		roll(dice, times - 1, index);
	}, 100);
}

function diceRoll() {
	let numRoll = 0;

	dice.forEach((item, index) => {
		let temp = Math.round(Math.random() * ROLL_TIMES + 5);
		numRoll = temp > numRoll ? temp : numRoll;
		roll(item, temp, index);
	});

	for (let i = 0; i < numRoll / 1.5; i++) {
		setTimeout(() => {
			const audio = new Audio(`audio/metal_${Math.floor(Math.random() * 2 + 1)}.wav`);
			audio.volume = volume;
			audio.play();
		}, DELAY_BETWEEN_SOUNDS * i);
	}
}
