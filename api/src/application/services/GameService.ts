import Game from '../domain/Game'

class GameService {
	levels: { level: string; lines: number; collumns: number; bombs: number }[]
	FIELD: { BOMB: string; BOOM: string; EMPTY: string; AVAILABLE: string; };
	game: Game;

	constructor () {
		this.levels = [
			{ level: 'Easy', 		lines: 8, 	collumns: 12, bombs: 10 },
			{ level: 'Normal', 	lines: 12, 	collumns: 16, bombs: 20 },
			{ level: 'Hard', 		lines: 16, 	collumns: 18, bombs: 40 },
			{ level: 'Custom', 	lines: 12, 	collumns: 16, bombs: 20 },
		]
		this.FIELD = {
			BOMB: 'bomb',
			BOOM: 'boom',
			EMPTY: 'empty',
			AVAILABLE: 'available',
		}
	}

	getGameLevels () {
		return this.levels
	}

	create (config) {
		this.game = new Game(config)
		this.game.initMinefield(this.FIELD.AVAILABLE)
		this.addBombsInTheField(this.game.config)
		return this.game
	}

	addBombsInTheField ({ lines, collumns, bombs }) {
		if (bombs > 0) {
			const x = this.getRandomAxis(lines)
			const y = this.getRandomAxis(collumns)

			if (this.game.minefield[x][y] !== this.FIELD.BOMB) {
				this.game.setField(x,y, this.FIELD.BOMB)
				bombs -= 1
			}
			this.addBombsInTheField({ lines, collumns, bombs })
		}
	}
	getRandomAxis (limit) {
		return Math.floor((Math.random() * limit) + 0)
	}

	play (x, y) {
		if (this.isBomb(x,y)) {
			this.game.setStatus('LOSE')
			this.game.setField(x,y, this.FIELD.BOOM)
		} else {
			this.openField(x,y)
		}
		return this.game
	}

	openField (x, y) {
		if (!this.isAvailable(x,y)) {
			if (this.isCompleted()) {
				this.game.setStatus('WIN')
			}
			return
		}

		let fields = this.getFieldsAround(x,y)

		// Clear fields out of matrix
		fields = fields.filter(field => (field.x >= 0 && field.y >= 0) 
			&& (field.x <= this.game.config.lines -1 && field.y <= this.game.config.collumns -1)
		)
		
		// Count bombs around
		const totalBombs = this.countBombsAround(fields)
		if (totalBombs > 0) {
			this.game.minefield[x][y] = totalBombs
			if (this.isCompleted()) {
				this.game.setStatus('WIN')
			}
			return
		}

		// Filter bombs
		fields = fields.filter(field => this.game.minefield[field.x][field.y] !== this.FIELD.BOMB)
		this.game.setField(x,y, this.FIELD.EMPTY)

		fields.map(field => this.openField(field.x, field.y))
	}

	isBomb (x, y) {
		return this.game.minefield[x][y] === this.FIELD.BOMB
	}

	isAvailable (x, y) {
		return this.game.minefield[x][y] === this.FIELD.AVAILABLE
	}

	isCompleted () {
		return !this.game.minefield.flat().find(field => field === this.FIELD.AVAILABLE)
	}

	countBombsAround (fields) {
		return fields.filter(field => this.game.minefield[field.x][field.y] === this.FIELD.BOMB).length
	}

	getFieldsAround (x, y) {
		return [
			{ x: x-1, y: y-1 	},
			{ x: x, 	y: y-1 	},
			{ x: x+1, y: y-1 	},
			{ x: x+1, y: y 		},
			{ x: x+1, y: y+1 	},
			{ x: x, 	y: y+1 	},
			{ x: x-1,	y: y+1 	},
			{ x: x-1, y: y	 	},
		]
	}
}

export default GameService