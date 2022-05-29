import { Router } from 'express'
import GameController from '../controllers/GameController'

const routes = Router()

const gameController = new GameController()

routes.get('/v1/game/levels', (req, res) => gameController.get(req, res))

routes.post('/v1/game', (req, res) => gameController.create(req, res))

routes.post('/v1/game/play', (req, res) => gameController.play(req, res))

export default routes