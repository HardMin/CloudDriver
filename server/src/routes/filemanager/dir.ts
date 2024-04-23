import { readdir } from 'node:fs'
import express from 'express'
const dir = express.Router()

const DIRECTORY_CLOUD = process.env.DIRECTORY_CLOUD

dir.get('/:path?', (req, res) => {
  const { path } = req.params
  
  const pathFormat = path?.replaceAll('>', '\\')
  const dirPath = `${DIRECTORY_CLOUD}\\${pathFormat || ''}`

  try {
    readdir(dirPath, {withFileTypes: true}, (err, result) => {
      if (err) {
        throw new Error('Dirección de carpeta no encontrada' + dirPath)
      }
    
      const directory: {name: string, path: string, size: string, type: string, last_modified: string}[] = []

      result.forEach(dir => {
        if (dir.isDirectory()) {
          directory.push({
            name: dir.name,
            path: dir.path,
            size: '',
            type: 'Carpeta de archivos',
            last_modified: ''
          })
        }

        else if (dir.isFile()) {
          directory.push({
            name: dir.name,
            path: dir.path,
            size: '',
            type: 'file',
            last_modified: ''
          })
        }

      })

      res.json({directory, status: 200}).status(200)
    });
  }
  catch (err) {
    res.json({ status: 404 }).status(404)
  }

})

export default dir