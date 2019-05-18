import Game from './game/main';
import './styles/app.css';

window.addEventListener('load', () => {
	const game = new Game(document.querySelector('.container'));
})


var start = 0;


window.addEventListener('scroll', (e) => {
	e.preventDefault();
})
