class Game {

	config: { 
		level: string; 
		lines: number; 
		collumns: number; 
		bombs: number 
	}; 
	minefield: any[]; 
	status: string 

	constructor (config) {
		this.config = config,
		this.minefield = [],
		this.status = 'PLAYING'
	}

	initMinefield(value) {
		this.minefield = new Array(this.config.lines).fill(value)
			.map(() => new Array(this.config.collumns).fill(value))
	}

	setField(x, y, field) {
		this.minefield[x][y] = field
	}

	setStatus (status) {
		this.status = status
	}

}

export default Game