if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

import express from 'express'
import { filemanager } from './routes/filemanager'
const app = express()

const cors = require('cors')

app.use(cors())

app.use(express.json())

const PORT = 3000
const HOST = process.env.HOST || '0.0.0.0'

app.use('/api', filemanager)

app.listen(PORT, HOST, () => {
  console.log(`Listening on ${PORT}`)
})