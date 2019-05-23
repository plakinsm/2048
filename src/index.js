import Game from './game/main';
import './styles/app.css';

window.addEventListener('load', () => {
	const game = new Game(document.querySelector('.container'), document.querySelector('.score'));
	document.querySelector('.restart').addEventListener('click', () => {
		game.restart();
	})
})

document.body.style.height = document.documentElement.clientHeight + 'px';
window.addEventListener('resize', () => {
	document.body.style.height = document.documentElement.clientHeight + 'px';
})