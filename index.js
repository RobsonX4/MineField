class Minefield {

	constructor () {
		this.config = {}

		this.FIELD = {
			BOMB: 'bomb',
			BOOM: 'boom',
			EMPTY: 'empty',
			AVAILABLE: 'available',
		}

		this.LEVELS = [
			{ title: 'Easy', lines: 5, collumns: 5, amountBombs: 3 },
			{ title: 'Normal', lines: 10, collumns: 10, amountBombs: 15 },
			{ title: 'Hard', lines: 15, collumns: 15, amountBombs: 30 },
			{ title: 'Custom' },
		]
	}

	/**
	 * Setup board game
	 */
	setup () {
		this.isFinished = false
		this.minefield = new Array(this.config.lines).fill(this.FIELD.AVAILABLE).map(
			() => new Array(this.config.collumns).fill(this.FIELD.AVAILABLE)
		)
		this.addBombsInTheField(this.config)
	}

	/**
	 * Add bombs in the field
	 * @param {Object} config 
	 */
	addBombsInTheField ({ lines, collumns, amountBombs }) {
		if (amountBombs > 0) {
			const x = this.getRandomAxis(lines)
			const y = this.getRandomAxis(collumns)
	
			if (this.minefield[x][y] !== this.FIELD.BOMB) {
				this.minefield[x][y] = this.FIELD.BOMB
				amountBombs -= 1
			}
			this.addBombsInTheField({ lines, collumns, amountBombs })
		}
	}

	/**
	 * Get a random integer number
	 * @param {Number} limit 
	 */
	getRandomAxis (limit) {
		return Math.floor((Math.random() * limit) + 0)
	}

	/**
	 * Play
	 * @param {Number} x 
	 * @param {Number} y 
	 */
	play (x, y) {
		if (this.isFinished) return
		
		if (this.isBomb(x,y)) {
			this.setLose()
			this.minefield[x][y] = this.FIELD.BOOM
			return
		}
		this.openField(x,y)
	}

	/**
	 * Recursive open field
	 * @param {Number} x 
	 * @param {Number} y 
	 */
	openField (x, y) {
		if (!this.isAvailable(x,y)) {
			this.isCompleted()
			return
		}

		let fields = this.getFieldsAround(x,y)

		// Clear fields out of matrix
		fields = fields.filter(field => (field.x >= 0 && field.y >= 0) 
			&& (field.x <= this.config.lines -1 && field.y <= this.config.collumns -1)
		)
		
		// Count bombs around
		const totalBombs = this.countBombsAround(fields)
		if (totalBombs > 0) {
			this.minefield[x][y] = totalBombs
			this.isCompleted()
			return
		}

		// Filter bombs
		fields = fields.filter(field => this.minefield[field.x][field.y] !== this.FIELD.BOMB)
		this.minefield[x][y] = this.FIELD.EMPTY

		fields.map(field => this.openField(field.x, field.y))
	}

	/**
	 * Verifiy bomb
	 * @param {Number} x 
	 * @param {Number} y 
	 */
	isBomb (x, y) {
		if (this.minefield[x][y] === this.FIELD.BOMB) return true
		return false
	}

	/**
	 * Verifiy if is available
	 * @param {Number} x 
	 * @param {Number} y 
	 */
	isAvailable (x, y) {
		if (this.minefield[x][y] === this.FIELD.AVAILABLE) return true
		return false
	}

	/**
	 * Verify if all fields except bomb are available
	 */
	isCompleted () {
		const availableField = this.minefield.flat().find(field => field === this.FIELD.AVAILABLE)
		if (!availableField) {
			this.isFinished = true
			this.setWin()
		}
	}

	/**
	 * Count how many bombs has around
	 * @param {Object} fields 
	 */
	countBombsAround (fields) {
		return fields.filter(field => this.minefield[field.x][field.y] === this.FIELD.BOMB).length
	}

	/**
	 * Set lose
	 */
	setLose () {
		this.isFinished = true
	}

	/**
	 * Set win
	 */
	setWin () {
		this.isFinished = true
		window.alert('You Win!')
	}

	/**
	 * Get arround fields position
	 * @param {Number} x 
	 * @param {Number} y 
	 */
	getFieldsAround (x, y) {
		return [
			{ x: x-1, y: y-1 },
			{ x: x, 	y: y-1 },
			{ x: x+1, y: y-1 },

			{ x: x+1, y: y },
			{ x: x+1, y: y+1 },

			{ x: x, 	y: y+1 },
			{ x: x-1,	y: y+1 },
			{ x: x-1, y: y },
		]
	}
}

new Minefield().setup()

/**
 * Angular config
 */
const app = angular.module('app', [])
angular.module('app').controller('minefield', Minefield);