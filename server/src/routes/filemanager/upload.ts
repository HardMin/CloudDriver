import express from 'express'
import fileUpload from 'express-fileupload'

const DIRECTORY_CLOUD = process.env.DIRECTORY_CLOUD

const upload: express.Router = express.Router()

type UploadedFile = fileUpload.UploadedFile;

function isSingleFile(file: UploadedFile | UploadedFile[]): file is UploadedFile {
    return typeof file === "object" && (file as UploadedFile).name !== undefined;
}

function isFileArray(file: UploadedFile | UploadedFile[]): file is UploadedFile[] {
    return Array.isArray(file);
}

upload.use(fileUpload({
  createParentPath: true,
  useTempFiles: true,
  tempFileDir: `${DIRECTORY_CLOUD}\\cloud`,

}));


upload.post('/:path?', (req, res) => {
  const { path } = req.params
  const files = req.files

  const pathFormat = path ? path.replaceAll('>', '\\') : ''
  const routeFormat = `${DIRECTORY_CLOUD}${pathFormat}`
  console.log({ path, routeFormat})

  if (!files) {
    console.log('El contenido no contiene archivos')
    // console.log(files)
    res.json({ message: 'No contiene archivos', status: 204}).status(204)
    return
  }

  const fileField = files.file

  if (isSingleFile(fileField)) {
    const route = `${routeFormat}\\${fileField.name}`
    fileField.mv(route, (err) => {
      if (err) {
        console.log(err, 'Error al intentar subir un archivo')
        return
      }
    })

  }
  else if (isFileArray(fileField)){
    fileField.map(file => {
      const route = `${routeFormat}\\${file.name}`
      file.mv(route, (err) => {
        if (err) {
          console.log(err, 'Error al intentar subir multiples archivos.')
          return
        }

      })
    })

  }
  
  res.json({ message: 'Contiene archivos', status: 200 }).status(200)

})

export default upload