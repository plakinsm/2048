import Game from './game/main';
import './styles/app.css';

window.addEventListener('load', () => {
	const game = new Game(document.querySelector('.container'));
})
