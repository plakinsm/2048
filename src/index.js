import Game from './game/main';
import './styles/app.css';

window.addEventListener('load', () => {
	const game = new Game(document.querySelector('.container'), document.querySelector('.score'));
	document.querySelector('.restart').addEventListener('click', () => {
		game.restart();
	})
})


var start = 0;


window.addEventListener('scroll', (e) => {
	e.preventDefault();
})
