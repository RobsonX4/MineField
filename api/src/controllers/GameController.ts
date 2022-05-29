import { Request, Response } from 'express'

import GameService from '../application/services/GameService'

class GameController {
	gameService: GameService

	constructor () {
		this.gameService = new GameService()
	}

	async get(req: Request, res: Response) {
		const result = this.gameService.getGameLevels()
		res.send(result)
	}

	async create(req: Request, res: Response) {
		const result = this.gameService.create(req.body)
		res.send(result)	}

	async play(req: Request, res: Response) {
		const { x, y } = req.body
		const result = this.gameService.play(x, y)
		res.send(result)
	}
}

export default GameController