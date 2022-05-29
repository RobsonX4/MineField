const dotenv = require('dotenv').config()
if (dotenv.error) throw dotenv.error

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './src/routes'

const { PORT } = process.env

const app = express()

app.use(cors())

app.use(bodyParser())

app.use(routes)

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
