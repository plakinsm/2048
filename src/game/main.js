import './style.css';
import './tiles.css';

export default class Game {
	constructor(el) {
		this.container = el;
		this.grid = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
		this.flag = false;
		this.wasSwitch = false;
		this.wasMove = false;
		window.addEventListener('keydown', this.keyDownHandler);
		this.created = false;
		this.generateGrid();
		this.generateTile();
		this.generateTile();

		this.touchX = null;
		this.touchY = null;
		this.touchSize = 70;
		this.movedByTouch = false;
		this.container.addEventListener('touchstart', (e) => {
			this.movedByTouch = false;
			this.touchX = e.touches[0].clientX;
			this.touchY = e.touches[0].clientY;
			console.log('fd');
		})

		this.container.addEventListener('touchend', (e) => {
			this.movedByTouch = false;
		})

		this.container.addEventListener('touchmove', this.touchMove);
	}

	touchMove = (e) => {
		e.preventDefault();
		if (this.movedByTouch) {
			return;
		}

		if (this.flag) {
			return;
		}

		const x = e.touches[0].clientX;
		const y = e.touches[0].clientY;
		if (this.touchX - x < -this.touchSize) {
			e.key = "ArrowRight";
			this.movedByTouch = true;
		} else if (this.touchX - x > this.touchSize) {
			e.key = "ArrowLeft";
			this.movedByTouch = true;
		} else if (this.touchY - y < -this.touchSize) {
			e.key = "ArrowDown";
			this.movedByTouch = true;
		} else if (this.touchY - y > this.touchSize) {
			e.key = "ArrowUp";
			this.movedByTouch = true;
		} 
		if (this.movedByTouch) {
			this.keyDownHandler(e);
		}
		
		
	}	

	switchTile = (tile1, tile2, tile3) => {
		this.flag = true;
		tile1.addEventListener('transitionend', () => {
			tile1.remove();
			tile2.remove();
			tile3.style.display = 'flex';
			tile3.classList.add('showed');
			if (!this.created) {
				this.generateTile();
				this.created = true;
			}
			this.flag = false;
		})
	}

	arrowUp = () => {
		this.wasSwitch = false;
		this.wasMove = false;
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (this.grid[i][j] !== 0) {
					let hasSwitched = false;
					const score = this.grid[i][j].innerText;
					let index = i;
					while (!hasSwitched && (index > 0) && (this.grid[index - 1][j] === 0 || this.grid[index - 1][j].innerText === score)) {
						if (this.grid[index - 1][j].innerText === score) {
							hasSwitched = true;
						}
						index -= 1;
					}

					if (hasSwitched) {
						this.wasMove = true;
						this.wasSwitch = true;
						let classes = this.grid[i][j].className;
						classes = classes.replace(/tile--row-\d/, `tile--row-${index + 1}`);
						this.grid[i][j].className = classes;

						const newTile = this.generateTile(score * 2, j + 1, index + 1, true);
						

						this.switchTile(this.grid[i][j], this.grid[index][j], newTile);
						this.grid[i][j] = 0;
						this.grid[index][j] = newTile;
						
						
					} else if (index !== i) {
						this.wasMove = true;
						let classes = this.grid[i][j].className;
						classes = classes.replace(/tile--row-\d/, `tile--row-${index + 1}`);
						this.grid[i][j].className = classes;
						this.grid[index][j] = this.grid[i][j];
						this.grid[i][j] = 0;
					}
				}
			}
		}
	}


	arrowDown = () => {
		this.wasSwitch = false;
		this.wasMove = false;
		for (let i = 3; i > -1; i--) {
			for (let j = 0; j < 4; j++) {
				if (this.grid[i][j] !== 0) {
					let hasSwitched = false;
					const score = this.grid[i][j].innerText;
					let index = i;
					while (!hasSwitched && (index < 3) && (this.grid[index + 1][j] === 0 || this.grid[index + 1][j].innerText === score)) {
						if (this.grid[index + 1][j].innerText === score) {
							hasSwitched = true;
						}
						index += 1;
					}

					if (hasSwitched) {
						this.wasMove = true;
						this.wasSwitch = true;
						let classes = this.grid[i][j].className;
						classes = classes.replace(/tile--row-\d/, `tile--row-${index + 1}`);
						this.grid[i][j].className = classes;

						const newTile = this.generateTile(score * 2, j + 1, index + 1, true);
						

						this.switchTile(this.grid[i][j], this.grid[index][j], newTile);
						this.grid[i][j] = 0;
						this.grid[index][j] = newTile;
						
						
					} else if (index !== i) {
						this.wasMove = true;
						let classes = this.grid[i][j].className;
						classes = classes.replace(/tile--row-\d/, `tile--row-${index + 1}`);
						this.grid[i][j].className = classes;
						this.grid[index][j] = this.grid[i][j];
						this.grid[i][j] = 0;
					}
				}
			}
		}
	}

	arrowLeft = () => {
		this.wasSwitch = false;
		this.wasMove = false;
		for (let j = 0; j < 4; j++) {
			for (let i = 0; i < 4; i++) {
				if (this.grid[i][j] !== 0) {
					let hasSwitched = false;
					const score = this.grid[i][j].innerText;
					let index = j;
					while (!hasSwitched && (index > 0) && (this.grid[i][index - 1] === 0 || this.grid[i][index - 1].innerText === score)) {
						if (this.grid[i][index - 1].innerText === score) {
							hasSwitched = true;
						}
						index -= 1;
					}

					if (hasSwitched) {
						this.wasMove = true;
						this.wasSwitch = true;
						let classes = this.grid[i][j].className;
						classes = classes.replace(/tile--col-\d/, `tile--col-${index + 1}`);
						this.grid[i][j].className = classes;

						const newTile = this.generateTile(score * 2, index + 1, i + 1, true);
						

						this.switchTile(this.grid[i][j], this.grid[i][index], newTile);
						this.grid[i][j] = 0;
						this.grid[i][index] = newTile;
						
						
					} else if (index !== j) {
						this.wasMove = true;
						let classes = this.grid[i][j].className;
						classes = classes.replace(/tile--col-\d/, `tile--col-${index + 1}`);
						this.grid[i][j].className = classes;
						this.grid[i][index] = this.grid[i][j];
						this.grid[i][j] = 0;
					}
				}
			}
		}
	}

	arrowRight = () => {
		this.wasSwitch = false;
		this.wasMove = false;
		for (let j = 3; j > -1; j--) {
			for (let i = 0; i < 4; i++) {
				if (this.grid[i][j] !== 0) {
					let hasSwitched = false;
					const score = this.grid[i][j].innerText;
					let index = j;
					while (!hasSwitched && (index < 3) && (this.grid[i][index + 1] === 0 || this.grid[i][index + 1].innerText === score)) {
						if (this.grid[i][index + 1].innerText === score) {
							hasSwitched = true;
						}
						index += 1;
					}

					if (hasSwitched) {
						this.wasMove = true;
						this.wasSwitch = true;
						let classes = this.grid[i][j].className;
						classes = classes.replace(/tile--col-\d/, `tile--col-${index + 1}`);
						this.grid[i][j].className = classes;

						const newTile = this.generateTile(score * 2, index + 1, i + 1, true);
						

						this.switchTile(this.grid[i][j], this.grid[i][index], newTile);
						this.grid[i][j] = 0;
						this.grid[i][index] = newTile;
						
						
					} else if (index !== j) {
						this.wasMove = true;
						let classes = this.grid[i][j].className;
						classes = classes.replace(/tile--col-\d/, `tile--col-${index + 1}`);
						this.grid[i][j].className = classes;
						this.grid[i][index] = this.grid[i][j];
						this.grid[i][j] = 0;
					}
				}
			}
		}
	}



	keyDownHandler = (e) => {
		if (this.flag) {
			return;
		}
		this.created = false;
		switch (e.key) {
			case "ArrowUp":
				this.arrowUp();
				break;
			case "ArrowDown":
				this.arrowDown();
				break;
			case "ArrowLeft":
				this.arrowLeft();
				break;
			case "ArrowRight":
				this.arrowRight();
				break;
		}

		if (!this.wasSwitch && this.wasMove) {
			this.generateTile();
		}
	}

	randomPos = () => {
		const arr = [];
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (this.grid[i][j] === 0) {
					arr.push({x : j + 1, y : i + 1});
				}
			}
		}

		const min = 0;
		const max = arr.length;
		const index = Math.floor(Math.random() * (max - min)) + min;
		return arr[index];
	}

	generateGrid = () => {
		this.gridContainer = document.createElement('div');
		this.gridContainer.classList.add('grid');
		for (let i = 0; i < 4; i++) {
			const gridRow = document.createElement('div');
			gridRow.classList.add('grid__row');
			for (let i = 0; i < 4; i++) {
				const gridCell = document.createElement('div');
				gridCell.classList.add('grid__cell');
				gridRow.appendChild(gridCell);
			}
			this.gridContainer.appendChild(gridRow);
		}
		this.tileContainer = document.createElement('div');
		this.tileContainer.classList.add('tile-container');
		this.gridContainer.appendChild(this.tileContainer);
		this.container.appendChild(this.gridContainer);
	}

	generateTile = (score = 2, x = null, y = null, flag = false) => {
		if (!(x || y)) {
			const pos = this.randomPos();
			x = pos.x;
			y = pos.y;
		}
		const tile = document.createElement('div');
		tile.innerText = score;
		const classes = `tile tile--${score} tile--row-${y} tile--col-${x}`;
		tile.className = classes;
		if (flag) {
			tile.style.display = 'none';
		} else {
			this.grid[y - 1][x - 1] = tile;
		}
		this.tileContainer.appendChild(tile);
		return tile;
	}
}