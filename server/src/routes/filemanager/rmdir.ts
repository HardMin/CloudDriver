import express from 'express'
import { rm, existsSync } from 'node:fs'
const _rmdir = express.Router()

const DIRECTORY_CLOUD = process.env.DIRECTORY_CLOUD

_rmdir.delete('/:path', (req, res) => {
  const { path } = req.params
  const pathFormat = path?.replaceAll('>', '\\')

  const route = `${DIRECTORY_CLOUD}\\${pathFormat}`

  if (!existsSync(route)) {
    console.log({ message: 'Error al intentar elimnar un elemento', path: pathFormat, status: 404 })
    res.json({ message: 'Error al intentar elimnar un elemento', path: pathFormat, status: 404 }).status(404)
    return
  }

  try {
    rm(route, {recursive: true}, (err) => {
      if (err) {
        throw new Error(err.message)
      }

      res.json({ message: 'Elemento borrado exitosamente', status: 200 })
    })
  }
  catch (err) {
    console.log(err)
    res.json({ message: 'Error al intentar elimnar un elemento', path: pathFormat, status: 404 })
  }

})

export default _rmdir