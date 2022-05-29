class Minefield {

	constructor (minefieldService) {
		this.minefieldService = minefieldService
		this.FIELD = {
			BOMB: 'bomb',
			BOOM: 'boom',
			EMPTY: 'empty',
			AVAILABLE: 'available',
		}
		this.init()
	}

	init () {
		let that = this
		this.minefieldService.getGameLevels().then(function(res) {
			that.levels = res.data
		})
	}

	setLevel (level) {
		that.game.config = level
	}

	create () {
		let that = this
		this.minefieldService.create(this.game.config).then(function(res) {
			that.game = res.data
		})
	}

	play (x, y) {
		let that = this
		if (this.game.status !== 'PLAYING') return
		this.minefieldService.play(x, y).then(function(res) {
			that.game = res.data
			if (that.game.status === 'WIN') {
				window.alert('You Win')
				return
			}
			if (that.game.status === 'LOSE') {
				window.alert('You Lose')
				return
			}
		})
	}
}

angular.module('app').controller('minefield', Minefield);