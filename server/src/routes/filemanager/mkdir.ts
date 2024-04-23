import { mkdir, existsSync } from 'node:fs'
import express from 'express'
const _mkdir = express.Router()

const DIRECTORY_CLOUD = process.env.DIRECTORY_CLOUD

_mkdir.post('/:path', (req, res) => {
  const { path } = req.params 

  if (typeof path !== 'string') {
    res.json({ error: 'not a string' }).status(404)
  } 

  const pathFormat = path?.replaceAll('>', '\\')

  const route = `${DIRECTORY_CLOUD}\\${pathFormat}`

  if (existsSync(route)) {
    console.log({ message: 'mkdir error: ', error: true, status: 404 })
    res.json({ message: `Carpeta ya existente`, error: true, status: 404 }).status(404)
    return
  }

  mkdir(route, {recursive: true}, (err) => {
    if (err) {
      console.log({ message: 'mkdir error: ', error: err.message, status: 404 })
      res.json({ message: `Carpeta ya existente`, error: err.message, status: 404 }).status(404)
    }

    console.log({ message: 'mkdir successfully', status: 200 })
    res.json({ message: 'mkdir successfully', status: 200 }).status(200)

  })
})

export default _mkdir