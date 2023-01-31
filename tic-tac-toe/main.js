let board = Array(9).fill('');
let playerOne = true;
let gameOver = false;

const announcement = document.querySelector('#game-announcement');
const resetBtn = document.querySelector('#reset-btn');
const continueBtn = document.querySelector('#continue-btn');
const tiles = document.querySelectorAll('.game-tile');
const xScore = document.querySelector('#x-score');
const oScore = document.querySelector('#o-score');

// Add this when the script is before the body
// window.addEventListener('DOMContentLoaded', () => {
// 	// Add event listeners to the reset button
// });

resetBtn.addEventListener('click', onReset);
continueBtn.addEventListener('click', onContinue);

// Add event listeners to the game tiles
tiles.forEach((tile, index) => {
	tile.addEventListener('click', () => {
		onCheck(tile, index);
	});
});

function onReset() {
	onContinue();
	xScore.innerText = 0;
	oScore.innerText = 0;
}

function onContinue() {
	board.fill('');
	tiles.forEach((tile) => {
		tile.innerText = '';
		tile.setAttribute('data-tile', '');
	});
	gameOver = false;
	announcement.innerText = '_';
}

function onCheck(tile, index) {
	if (board[index] !== '' || gameOver) return;
	let move = playerOne ? 'X' : 'O';
	board[index] = move;
	tile.innerText = move;
	tile.setAttribute('data-tile', move);
	playerOne = !playerOne;
	let result = isOver();
	if (!result) return;
	onGameOver(result);
}

function isOver() {
	if (board[0] === board[1] && board[1] === board[2] && board[0] !== '') return board[0];
	if (board[3] === board[4] && board[4] === board[5] && board[3] !== '') return board[3];
	if (board[6] === board[7] && board[7] === board[8] && board[6] !== '') return board[6];
	if (board[0] === board[3] && board[3] === board[6] && board[0] !== '') return board[0];
	if (board[1] === board[4] && board[4] === board[7] && board[1] !== '') return board[1];
	if (board[2] === board[5] && board[5] === board[8] && board[2] !== '') return board[2];
	if (board[0] === board[4] && board[4] === board[8] && board[0] !== '') return board[0];
	if (board[2] === board[4] && board[4] === board[6] && board[2] !== '') return board[2];
	if (board.indexOf('') === -1) return 'draw';
	return false;
}

function onGameOver(result) {
	gameOver = true;
	let message = result === 'draw' ? 'Draw!' : `${result} wins!`;
	announcement.innerText = message;
	if (result === 'draw') return;
	if (result === 'X') {
		xScore.innerText = parseInt(xScore.innerText) + 1;
	}
	if (result === 'O') {
		oScore.innerText = parseInt(oScore.innerText) + 1;
	}
}
